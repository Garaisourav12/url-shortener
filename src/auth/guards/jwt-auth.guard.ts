import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any) {
    if (err) {
      throw new UnauthorizedException('Unexpected authentication error.');
    }

    if (info?.name === 'TokenExpiredError') {
      throw new UnauthorizedException('Token expired.');
    }

    if (info?.name === 'JsonWebTokenError') {
      throw new UnauthorizedException('Invalid token.');
    }

    if (
      info?.message === 'No auth token' ||
      info?.message?.includes('No auth')
    ) {
      throw new UnauthorizedException('Token not found.');
    }

    if (!user) {
      throw new UnauthorizedException('Authentication failed.');
    }

    return user;
  }
}
