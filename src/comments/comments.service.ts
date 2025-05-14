import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/createComment.dto';

@Injectable()
export class CommentsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(userId: number, postId: number, createCommentDto: CreateCommentDto) {
        const post = await this.prisma.post.findUnique({ where: { id: postId } });

        if (!post) {
            throw new NotFoundException('Post Not Found');
        }

        await this.prisma.comment.create({
            data: {
                text: createCommentDto.text,
                postId,
                userId,
            },
        });

        return { message: 'Comment added successfully' };
    }

    async remove(userId: number, commentId: number) {
        const comment = await this.prisma.comment.findUnique({ where: { id: commentId } });

        if (!comment) {
            throw new NotFoundException('Comment Not Found');
        }

        if (comment.userId !== userId) {
            throw new ForbiddenException('You are not allowed to delete this comment');
        }

        await this.prisma.comment.delete({ where: { id: commentId } });

        return { message: 'Comment deleted successfully' };
    }
}
