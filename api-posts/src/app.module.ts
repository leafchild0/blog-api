import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/postsModule';

@Module({
  imports: [ConfigModule.forRoot(), PostsModule],
})
export class AppModule {}
