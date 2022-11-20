import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { JwtGuard } from '../../../core/auth/guard';
import { BookmarkService } from '../services/bookmark.service';
import {
  CreateBookmarkDto,
  EditBookmarkDto,
} from '../models';
import { GetUser } from 'src/routes/auth/controllers/get-user.decorator';

@ApiBearerAuth()
@ApiTags("BookMarks")
@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(
    private bookmarkService: BookmarkService,
  ) { }

  @Get('/')
  async getBookmarks(@GetUser() user: User) {
    return this.bookmarkService.getBookmarks(
      user.id,
    );
  }

  @Get('/:id')
  async getBookmarkById(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.getBookmarkById(
      user.id,
      bookmarkId,
    );
  }

  @Post('/')
  async createBookmark(
    @GetUser() user: User,
    @Body() dto: CreateBookmarkDto,
  ) {
    console.log(user.id)
    return this.bookmarkService.createBookmark(
      user.id,
      dto,
    );
  }

  @Patch('/:id')
  editBookmarkById(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: EditBookmarkDto,
  ) {
    return this.bookmarkService.editBookmarkById(
      user.id,
      bookmarkId,
      dto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteBookmarkById(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.deleteBookmarkById(
      user.id,
      bookmarkId,
    );
  }
}