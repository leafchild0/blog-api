import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/users.dto';
import { LoginInput, SignUpInput, TokenPayload } from './auth.dto';
import { hashSync, compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUserPassword(password: string, pass: string): Promise<void> {
    const isPassSame = compareSync(pass, password);
    if (!isPassSame) {
      throw new UnauthorizedException("Password don't match");
    }
    return null;
  }

  async login(input: LoginInput): Promise<TokenPayload> {
    const user = await this.usersService.getUserByUsername(input.name);
    await this.validateUserPassword(input.password, user.password);

    const payload = {
      username: user.name,
      sub: user.id,
    };
    return {
      access_token: this.signToken(payload),
    };
  }

  signUp(input: SignUpInput): Promise<UserDto> {
    return this.usersService.createUser({
      ...input,
      password: hashSync(input.password, 10),
    });
  }

  private signToken(payload): string {
    return this.jwtService.sign(payload);
  }
}
