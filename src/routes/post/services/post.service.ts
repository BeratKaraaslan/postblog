import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreatePostDto, UpdatePostDto } from '../models/posts-dto';

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) { }


    async getPosts(userId: number) {

        const result = this.prisma.post.findMany({
            where: {
                userId: userId
            }
        })

        return result
    }


    async getById(userId: number, postId: number) {

        const result = this.prisma.post.findFirst({
            where: {
                id: postId,
                userId: userId
            }
        })

        return result
    }


    async create(userId: number, body: CreatePostDto) {
        const post = await this.prisma.post.create({
            data: {
                userId: userId,
                title: body.title,
                description: body.description,
                body: body.body,
                imageUrl: body.imageUrl
            },
        });
        return post;
    }


    async update(userId: number, body: UpdatePostDto, postId: number) {
        const post = await this.prisma.post.findUnique({
            where: {
                id: postId,
            },
        });
        if (!post || post.userId !== userId) {
            throw new ForbiddenException(
                'Access to resources denied',
            )
        };
        return this.prisma.bookmark.update({
            where: {
                id: postId,
            },
            data: {
                ...body,
            },
        });
    }


    async delete(postId: number, userId: number) {
        const findpost = await this.prisma.post.findUnique({
            where: {
                id: postId,
            },
        });
        if (!findpost || findpost.userId !== userId) {
            throw new ForbiddenException(
                'Access to resources denied',
            )
        };

        const deletePost = await this.prisma.post.delete({
            where: {
                id: postId,
            },
        });

        return deletePost;
    }

}
