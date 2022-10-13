import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserInput {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  email: string;
  @IsOptional()
  roles?: string[];
}

export class UpdateUserInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsOptional()
  @IsArray()
  @ApiProperty()
  roles?: string[];
}

export class UserDto {
  id: string;
  name: string;
  email: string;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserEntity {
  name: string;
  email: string;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDocument extends UserEntity, Document {}
