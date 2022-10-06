import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [ConfigModule.forRoot(), TagsModule],
})
export class AppModule {}
