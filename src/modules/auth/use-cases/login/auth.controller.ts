/* eslint-disable prettier/prettier */
import { Request, Controller, Post } from '@nestjs/common';
import { Public } from '../../decorators/public.decorator';
import { GenerateAccessAndRefreshTokenUseCase } from '../generate-token/generate-token-and-refresh.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private generateAccessAndRefreshTokenUseCase: GenerateAccessAndRefreshTokenUseCase,
  ) {}

  @Post('login')
  @Public()
  async signIn(@Request() req) {
    const { accessToken, refreshToken } =
      await this.generateAccessAndRefreshTokenUseCase.execute(req.user.id);
    return {
      accessToken,
      refreshToken,
    };
  }
}
