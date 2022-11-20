import { Controller, Get, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { Body, Delete, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/core/auth/guard';
import { GetUser } from 'src/routes/auth/controllers/get-user.decorator';
import { CreatePostDto, UpdatePostDto } from '../models/posts-dto';
import { PostService } from '../services/post.service';


@ApiBearerAuth()
@ApiTags("Posts")
@UseGuards(JwtGuard)
@Controller('posts')
export class PostController {
    constructor(
        private postService: PostService,
    ) { }


    @Get('/')
    async getPosts(@GetUser() user: User) {
        return this.postService.getPosts(user.id);
    }


    @Get('/byId')
    async getById(
        @GetUser() user: User,
        @Param('id', ParseIntPipe) postId: number,
    ) {
        return this.postService.getById(user.id, postId);
    }


    @Post('/create')
    async create(@GetUser() user: User, @Body() body: CreatePostDto) {
        return this.postService.create(user.id, body);
    }


    @Patch('/update')
    async update(
        @GetUser() user: User,
        @Body() body: UpdatePostDto,
        @Param('id', ParseIntPipe) postId: number,
    ) {
        return this.postService.update(user.id, body, postId);
    }


    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('/delete')
    async delete(
        @GetUser() user: User,
        @Param('id', ParseIntPipe) postId: number,
    ) {
        return this.postService.delete(postId, user.id);
    }
}

