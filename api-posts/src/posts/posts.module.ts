import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { ConfigModule } from '@nestjs/config';
import { postsProviders } from './posts.provider';
import { DbModule } from '../db/db.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule.forRoot(), DbModule, HttpModule],
  controllers: [PostsController],
  providers: [...postsProviders, PostsService],
})
export class PostsModule {}
