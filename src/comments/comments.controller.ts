import { Controller, Post, Body, Delete, Param, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCommentDto } from './dto/createComment.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) { }

    @Post(':postId')
    create(@Req() req: any, @Param('postId', ParseIntPipe) postId: number, @Body() createCommentDto: CreateCommentDto) {
        return this.commentsService.create(req.user.id, postId, createCommentDto);
    }

    @Delete(':id')
    remove(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
        return this.commentsService.remove(req.user.id, id);
    }
}
