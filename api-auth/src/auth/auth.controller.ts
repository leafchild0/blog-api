import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { SignUpInput } from './auth.dto';
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
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
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
