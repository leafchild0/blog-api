import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Document } from 'mongoose';

export class CreatePostInput {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  body: string;
  @IsOptional({ each: true })
  @IsArray()
  @IsMongoId({ each: true })
  tags?: [];
}

export class UpdatePostInput {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  body: string;
  @IsOptional({ each: true })
  @IsArray()
  @IsMongoId({ each: true })
  tags?: [];
}

export class PostDto {
  id: string;
  name: string;
  body: string;
  tags?: [];
  createdAt: Date;
  updatedAt: Date;
}

export interface PostEntity {
  name: string;
  body: string;
  tags?: [];
  createdAt: Date;
  updatedAt: Date;
}

export interface PostDocument extends PostEntity, Document {}
