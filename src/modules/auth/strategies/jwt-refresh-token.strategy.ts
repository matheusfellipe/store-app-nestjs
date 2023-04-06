import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { authConfig } from '../config/auth.config';
import { PayloadToken } from './interfaces/jwt.interfaces';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: authConfig.secret,
    });
  }

  async validate(payload: PayloadToken) {
    return { userId: payload.sub, roles: payload.role };
  }
}
