import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/users.dto';
import { SignUpInput, TokenPayload } from './auth.dto';
import { hashSync, compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<UserDto> {
    const user = await this.usersService.getUserByUsername(username);
    const isPassSame = compareSync(pass, user.password);
    if (isPassSame) {
      return {
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        name: user.name,
        email: user.email,
        roles: user.roles,
        id: user.id,
      };
    }
    return null;
  }

  async login(user: any): Promise<TokenPayload> {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  signUp(input: SignUpInput): Promise<UserDto> {
    return this.usersService.createUser({
      ...input,
      password: hashSync(input.password, 10),
    });
  }
}
