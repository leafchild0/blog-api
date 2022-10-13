import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput, SignUpInput, TokenPayload } from './auth.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../users/users.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    operationId: 'login',
    description: 'Login user',
  })
  @ApiBody({ type: LoginInput })
  @Post('login')
  async login(@Body() input: LoginInput): Promise<TokenPayload> {
    return this.authService.login(input);
  }

  @ApiBody({ type: SignUpInput })
  @ApiOperation({
    operationId: 'signUp',
    description: 'Create new user',
  })
  @Post('signup')
  async signUp(@Body() input: SignUpInput): Promise<UserDto> {
    return this.authService.signUp(input);
  }
}
