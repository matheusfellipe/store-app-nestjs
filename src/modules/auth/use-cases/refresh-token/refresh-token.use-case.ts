/* eslint-disable prettier/prettier */
import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { DateHandlingProvider } from 'src/@shared/providers';
import { GenerateHashCodeProvider } from 'src/@shared/providers';

import { authConfig } from '../../config/auth.config';

import { RefreshTokenDTO } from '../../dto/refresh-token.dto';
import { RefreshTokenRepository } from '../../repositories/refresh-token.repository';
import { AuthUseCase } from '../login/auth.use-case';
import { OutputRefreshTokenService } from '../interfaces/refresh-token.interface';

interface UserProps {
  userId: string;
}

@Injectable()
export class RefreshTokenUseCase {
  private readonly logger = new Logger(AuthUseCase.name);
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly jwtService: JwtService,
    private readonly generateHashCodeProvider: GenerateHashCodeProvider,
    private readonly dateHandlingProvider: DateHandlingProvider,
  ) {}

  async execute(
    refreshTokenPayload: RefreshTokenDTO,
    user: UserProps,
  ): Promise<OutputRefreshTokenService> {
    const refreshToken = await this.refreshTokenRepository.find({
      refreshToken: refreshTokenPayload.refreshToken,
      userId: user.userId,
    });

    if (!refreshToken) {
      const error = new NotFoundException('Refresh token');
      this.logger.error(error.message);
      throw new NotFoundException('Refresh token not found');
    }

    const currentDate = new Date();

    const IsRefreshTokenExpired = this.dateHandlingProvider.isAfter(
      currentDate,
      refreshToken.expiresAt,
    );

    if (IsRefreshTokenExpired) {
      await this.refreshTokenRepository.delete(refreshToken?.id);
      throw new UnauthorizedException('Refresh token is expired');
    }

    const newToken = this.jwtService.sign({
      sub: user.userId,
    });

    const newRefreshToken = this.generateHashCodeProvider.generate(40);

    const expirationDate = this.dateHandlingProvider.addHours(
      currentDate,
      authConfig.refreshTokenExpiresIn,
    );

    await this.refreshTokenRepository.update({
      id: refreshToken.id,
      refreshToken: newRefreshToken,
      expiresAt: expirationDate,
    });

    this.logger.log('Refresh token renewed successfully');

    return {
      accessToken: newToken,
      refreshToken: newRefreshToken,
    };
  }
}
