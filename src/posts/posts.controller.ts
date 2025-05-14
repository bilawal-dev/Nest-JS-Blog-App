import { Controller, Post, Body, UseGuards, Get, Param, ParseIntPipe, Patch, Delete, Req, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';


@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Req() req: any, @Body() createPostDto: CreatePostDto) {
        return this.postsService.create(req.user.id, createPostDto);
    }

    @Get()
    findAll(
        @Query('category') category?: string,
        @Query('author') author?: string,
        @Query('search') search?: string,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        return this.postsService.findAll({ category, author, search, page: parseInt(page || '1'), limit: parseInt(limit || '10') });
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.postsService.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    update(@Req() req: any, @Param('id', ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto) {
        return this.postsService.update(req.user.id, id, updatePostDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    remove(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
        return this.postsService.remove(req.user.id, id);
    }
}
