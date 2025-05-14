import { Controller, Post, Delete, Param, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { LikesService } from './likes.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('likes')
export class LikesController {
    constructor(private readonly likesService: LikesService) { }

    @Post(':postId')
    likePost(@Req() req: any, @Param('postId', ParseIntPipe) postId: number) {
        return this.likesService.likePost(req.user.id, postId);
    }

    @Delete(':postId')
    unlikePost(@Req() req: any, @Param('postId', ParseIntPipe) postId: number) {
        return this.likesService.unlikePost(req.user.id, postId);
    }
}
