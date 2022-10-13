import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SECRET_KEY } from '../common/config';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('access-token'),
      ignoreExpiration: false,
      secretOrKey: SECRET_KEY,
    });
  }

  async validate(payload: any) {
    // Check user exists
    const user = await this.userService.getUser(payload.sub);
    // Check roles?
    if (!user.roles.includes('USER')) {
      throw new UnauthorizedException('Inefficient permissions');
    }

    return { userId: payload.sub, username: payload.username };
  }
}
