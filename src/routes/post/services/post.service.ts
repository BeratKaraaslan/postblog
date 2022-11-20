import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreatePostDto, UpdatePostDto } from '../models/posts-dto';

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) { }


    async getPosts(userId: number) {

        const sql = `select * from posts where userId=$1`
        const result = this.prisma.$queryRawUnsafe<any[]>(sql, userId)

        return result
    }


    async getById(userId: number, postId: number) {

        const sql = `select * from posts where userId=$1 and id=$2`
        const result = this.prisma.$queryRawUnsafe<any[]>(sql, userId, postId)

        return result
    }


    async create(userId: number, body: CreatePostDto) {
        const post = await this.prisma.post.create({
            data: {
                userId,
                ...body,
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

        const deletePost = await this.prisma.delete({
            where: {
                id: postId,
            },
        });

        return deletePost;
    }

}
