import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './routes/auth/auth.module';
import { UserModule } from './routes/user/user.module';
import { BookmarkModule } from './routes/bookmark/bookmark.module';
import { PrismaModule } from './core/prisma/prisma.module';
import { PostsModule } from './routes/post/posts.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), AuthModule, BookmarkModule, UserModule, PrismaModule, PostsModule],
})
export class AppModule { }

