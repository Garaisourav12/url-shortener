import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any) {
    if (err) {
      throw new UnauthorizedException('Unexpected authentication error.');
    }

    if (info?.name === 'TokenExpiredError') {
      throw new UnauthorizedException('Your session has expired.');
    }

    if (info?.name === 'JsonWebTokenError') {
      throw new UnauthorizedException('Invalid token.');
    }

    if (!user) {
      throw new UnauthorizedException('Authentication failed.');
    }

    return user;
  }
}
