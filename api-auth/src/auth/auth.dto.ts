import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpInput {
  @ApiProperty()
  @IsNotEmpty()
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
