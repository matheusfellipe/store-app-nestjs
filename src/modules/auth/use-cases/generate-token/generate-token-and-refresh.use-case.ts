import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DateHandlingProvider } from 'src/@shared/providers/date-handling.provider';
import { GenerateHashCodeProvider } from 'src/@shared/providers/generate-hash-code.provider';
import { authConfig } from '../../config/auth.config';
import { RefreshTokenRepository } from '../../repositories/refresh-token.repository';

@Injectable()
export class GenerateAccessAndRefreshTokenUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly generateHashCodeProvider: GenerateHashCodeProvider,
    private readonly dateHandlingProvider: DateHandlingProvider,
  ) {}
  async execute(user: any) {
    const payload = { sub: user.id };

    const accessToken = this.jwtService.sign(payload);

    const expirationDate = this.dateHandlingProvider.addHours(
      new Date(),
      authConfig.refreshTokenExpiresIn,
    );

    const refreshToken = this.generateHashCodeProvider.generate(40);

    await this.refreshTokenRepository.create({
      refreshToken: refreshToken,
      userId: user,
      expiresAt: expirationDate,
    });
    return {
      accessToken,
      refreshToken,
    };
  }
}
