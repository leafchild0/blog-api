import { IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';

export class CreateTagInput {
  @IsNotEmpty()
  name: string;
  description?: string;
}

export class UpdateTagInput {
  @IsNotEmpty()
  name: string;
  description?: string;
}

export class TagDto {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TagEntity {
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TagDocument extends TagEntity, Document {}
