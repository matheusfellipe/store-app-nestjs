/* eslint-disable prettier/prettier */
import {
  Request,
  Controller,
  Post,
  UseGuards,
  Put,
  Body,
} from '@nestjs/common';
import { Public } from '../../decorators/public.decorator';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { GenerateAccessAndRefreshTokenUseCase } from '../generate-token/generate-token-and-refresh.use-case';
import { RefreshTokenUseCase } from '../refresh-token/refresh-token.use-case';
import { JwtRefreshGuard } from '../../guards/jwt-refresh-token.guard';
import { RefreshTokenDTO } from '../../dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private generateAccessAndRefreshTokenUseCase: GenerateAccessAndRefreshTokenUseCase,
    private refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Public()
  async login(@Request() req) {
    const { accessToken, refreshToken } =
      await this.generateAccessAndRefreshTokenUseCase.execute(req.user.id);
    return {
      accessToken,
      refreshToken,
    };
  }

  @Put('refresh-token')
  @UseGuards(JwtRefreshGuard)
  @Public()
  async update(@Body() requestBody: RefreshTokenDTO, @Request() req) {
    return this.refreshTokenUseCase.execute(requestBody, req.user);
  }
}
