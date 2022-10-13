import {
  IsEmail,
  IsLowercase,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsLowercase()
  name: string;
  @IsNotEmpty()
  @ApiProperty()
  password: string;
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
  @IsOptional()
  @ApiProperty()
  roles?: string[];
}

export class TokenPayload {
  access_token: string;
}

export class LoginInput {
  @IsNotEmpty()
  @IsString()
  @IsLowercase()
  @ApiProperty()
  name: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
}
