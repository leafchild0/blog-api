import { IsArray, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserInput {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsOptional()
  roles?: string[];
}

export class UpdateUserInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
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
  password: string;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDocument extends UserEntity, Document {}
