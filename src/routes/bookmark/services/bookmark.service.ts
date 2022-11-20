import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import {
  CreateBookmarkDto,
  EditBookmarkDto,
} from '../models';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) { }

  getBookmarks(userId: number) {
    return this.prisma.bookmark.findMany({
      where: {
        userId,
      },
    });
  }

  // getBookmarkById(
  //   userId: number,
  //   bookmarkId: number,
  // ) {
  //   return this.prisma.bookmark.findFirst({
  //     where: {
  //       id: bookmarkId,
  //       userId,
  //     },
  //   });
  // }

  async createBookmark(
    userId: number,
    dto: CreateBookmarkDto,
  ) {
    const bookmark =
      await this.prisma.bookmark.create({
        data: {
          userId,
          ...dto,
        },
      });

    return bookmark;
  }

  async editBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkDto,
  ) {
    // get the bookmark by id
    const bookmark =
      await this.prisma.bookmark.findUnique({
        where: {
          id: bookmarkId,
        },
      });

    // check if user owns the bookmark
    if (!bookmark || bookmark.userId !== userId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    return this.prisma.bookmark.update({
      where: {
        id: bookmarkId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteBookmarkById(
    userId: number,
    bookmarkId: number,
  ) {
    const bookmark =
      await this.prisma.bookmark.findUnique({
        where: {
          id: bookmarkId,
        },
      });

    // check if user owns the bookmark
    if (!bookmark || bookmark.userId !== userId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    await this.prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    });
  }


  async getBookmarkById(userId: number, bookmarkId: number): Promise<any[]> {
    const sql = ` SELECT * FROM bookmarks where id=$1 and "userId"=$2 `
    const result = this.prisma.$queryRawUnsafe<any[]>(sql, bookmarkId, userId)

    return result;
  }
}