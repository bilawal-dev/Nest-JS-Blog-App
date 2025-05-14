import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { Prisma } from '@prisma/client';

interface FindAllParams {
    category?: string;
    author?: string;
    search?: string;
    page?: number;
    limit?: number;
}


@Injectable()
export class PostsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(userId: number, createPostDto: CreatePostDto) {
        const { title, content, categoryId } = createPostDto;

        // * VALIDATE CATEGORY ID
        const category = await this.prisma.category.findUnique({ where: { id: categoryId } });
        if (!category) {
            throw new NotFoundException('Category Not Found');
        }

        await this.prisma.post.create({
            data: {
                title,
                content,
                categoryId,
                authorId: userId,
            },
        });

        return { message: 'Post Created Successfully' };
    }

    async findAll({ category, author, search, page = 1, limit = 10, }: FindAllParams) {
        const skip = (page - 1) * limit;
        const take = limit;
        const where: Prisma.PostWhereInput = {};

        // * Filter By Category Name
        if (category) {
            where.category = { name: category };
        }

        // * Filter By Author Name
        if (author) {
            where.author = { name: author };
        }

        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { content: { contains: search, mode: 'insensitive' } },
            ];
        }

        const posts = await this.prisma.post.findMany({
            where,
            skip,
            take,
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                category: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                comments: {
                    select: {
                        id: true,
                        text: true,
                        createdAt: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        }
                    }
                },
                likes: {
                    select: {
                        id: true,
                        userId: true,
                    }
                }
            }
        });

        return posts.map(post => ({
            ...post,
            likeCount: post.likes.length,
            commentCount: post.comments.length,
        }));
    }

    async findOne(id: number) {
        const post = await this.prisma.post.findUnique({
            where: { id },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                category: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                comments: {
                    select: {
                        id: true,
                        text: true,
                        createdAt: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        }
                    }
                },
                likes: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        }
                    }
                }
            }
        });

        if (!post) {
            throw new NotFoundException('Post Not Found');
        }

        return {
            ...post,
            likeCount: post.likes.length,
            commentCount: post.comments.length,
        };
    }

    async update(userId: number, postId: number, updatePostDto: UpdatePostDto) {
        const post = await this.prisma.post.findUnique({ where: { id: postId } });

        if (!post) {
            throw new NotFoundException('Post Not Found');
        }

        if (post.authorId !== userId) {
            throw new ForbiddenException('You are not the author of this post');
        }

        // * VALIDATE CATEGORY ID
        if (updatePostDto.categoryId) {
            const category = await this.prisma.category.findUnique({ where: { id: updatePostDto.categoryId } });
            if (!category) {
                throw new NotFoundException('Category Not Found');
            }
        }

        await this.prisma.post.update({
            where: { id: postId },
            data: {
                ...updatePostDto,
            },
        });

        return { message: 'Post Updated Successfully' };
    }

    async remove(userId: number, postId: number) {
        const post = await this.prisma.post.findUnique({ where: { id: postId } });

        if (!post) {
            throw new NotFoundException('Post Not Found');
        }

        if (post.authorId !== userId) {
            throw new ForbiddenException('You are not the author of this post');
        }

        await this.prisma.post.delete({ where: { id: postId } });

        return { message: 'Post Deleted Successfully' };
    }
}
