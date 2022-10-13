import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);
  constructor(private readonly httpService: HttpService) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const tokenHeader = request.headers['access-token'];
    if (!tokenHeader) {
      throw new UnauthorizedException('Token is missing');
    }
    return this.validateRequestToken(tokenHeader);
  }

  private async validateRequestToken(token: string): Promise<boolean> {
    const host = 'http://localhost:3003';
    try {
      const res = await this.httpService
        .post(`${host + '/api-auth/auth/authorize'}`, null, {
          headers: {
            'access-token': token,
          },
        })
        .toPromise();

      return res.status === 200;
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }
}
