import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LikesService {
    constructor(private readonly prisma: PrismaService) { }

    async likePost(userId: number, postId: number) {
        const post = await this.prisma.post.findUnique({ where: { id: postId } });

        if (!post) {
            throw new NotFoundException('Post Not Found');
        }

        try {
            await this.prisma.like.create({
                data: {
                    userId,
                    postId,
                },
            });

            return { message: 'Post liked successfully' };
        } catch (error) {
            throw new ForbiddenException('You already liked this post');
        }
    }

    async unlikePost(userId: number, postId: number) {
        const like = await this.prisma.like.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId,
                },
            },
        });

        if (!like) {
            throw new NotFoundException('You have not liked this post');
        }

        await this.prisma.like.delete({
            where: {
                id: like.id,
            },
        });

        return { message: 'Post unliked successfully' };
    }
}
