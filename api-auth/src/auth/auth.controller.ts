import { Controller, Post, Body, UseGuards, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput, SignUpInput, TokenPayload } from './auth.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../users/users.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

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

  @ApiOperation({
    operationId: 'authorize',
    description: 'Verify user token and user',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('authorize')
  async authorize(@Response() res): Promise<void> {
    // Since guard does all stuff, simply return 200
    return res.status(200).send();
  }
}
