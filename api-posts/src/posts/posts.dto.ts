import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';

export class CreatePostInput {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  body: string;
  @IsMongoId({ each: true })
  tags: [];
}

export class UpdatePostInput {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  body: string;
  @IsMongoId({ each: true })
  tags: [];
}

export class PostDto {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostEntity {
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostDocument extends PostEntity, Document {}
