/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '../users/users.module';
import { authConfig } from './config/auth.config';
import { GenerateAccessAndRefreshTokenUseCase } from './use-cases/generate-token/generate-token-and-refresh.use-case';
import { AuthUseCase } from './use-cases/login/auth.use-case';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: authConfig.secret,
      signOptions: {
        expiresIn: authConfig.expiresIn,
        audience: authConfig.audience,
        issuer: authConfig.issuer,
        jwtid: authConfig.jwtId,
      },
    }),
  ],
  providers: [AuthUseCase, GenerateAccessAndRefreshTokenUseCase],
})
export class AuthModule {}
