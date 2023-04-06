import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { authConfig } from '../config/auth.config';
import { PayloadToken } from './interfaces/jwt.interfaces';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig.secret,
      jsonWebTokenOptions: {
        audience: authConfig.audience,
        issuer: authConfig.issuer,
      },
    } as StrategyOptions);
  }

  async validate(payload: PayloadToken) {
    return { studentId: payload.sub, userRole: payload.role };
  }
}
