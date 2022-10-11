import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { ConfigModule } from '@nestjs/config';
import { postsProviders } from './posts.provider';
import { DbModule } from '../db/db.module';

@Module({
  imports: [ConfigModule.forRoot(), DbModule],
  controllers: [PostsController],
  providers: [...postsProviders, PostsService],
})
export class PostsModule {}
