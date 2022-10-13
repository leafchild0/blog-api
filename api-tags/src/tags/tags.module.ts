import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { ConfigModule } from '@nestjs/config';
import { tagsProviders } from './tags.provider';
import { DbModule } from '../db/db.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule.forRoot(), DbModule, HttpModule],
  controllers: [TagsController],
  providers: [...tagsProviders, TagsService],
})
export class TagsModule {}
