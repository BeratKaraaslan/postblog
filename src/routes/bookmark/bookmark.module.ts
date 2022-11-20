import { Module } from '@nestjs/common';
import { BookmarkController } from './controllers/bookmark.controller';
import { BookmarkService } from './services/bookmark.service';

@Module({
  controllers: [BookmarkController],
  providers: [BookmarkService]
})
export class BookmarkModule { }