import { IsNotEmpty } from 'class-validator';

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
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TagDocument {
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
