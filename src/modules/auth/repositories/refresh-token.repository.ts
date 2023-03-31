/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { prismaClient } from '../../../@shared/providers';
import {
  InputCreateRefreshTokenRepository,
  InputFindRefreshTokenRepository,
  InputUpdateRefreshTokenRepository,
  OutputFindRefreshTokenRepository,
} from './interface/refresh-token.interface';

@Injectable()
export class RefreshTokenRepository {
  async create(
    refreshTokenPayload: InputCreateRefreshTokenRepository,
  ): Promise<void> {
    await prismaClient.refreshToken.create({
      data: {
        userId: refreshTokenPayload.userId,
        hash: refreshTokenPayload.refreshToken,
        expiresAt: refreshTokenPayload.expiresAt,
      },
    });
  }

  async find(
    refreshTokenPayload: InputFindRefreshTokenRepository,
  ): Promise<OutputFindRefreshTokenRepository> {
    const refreshToken = await prismaClient.refreshToken.findFirst({
      where: {
        userId: refreshTokenPayload.userId,
        hash: refreshTokenPayload.refreshToken,
      },
    });

    return refreshToken;
  }

  async update(
    refreshTokenPayload: InputUpdateRefreshTokenRepository,
  ): Promise<void> {
    await prismaClient.refreshToken.update({
      where: {
        id: refreshTokenPayload.id,
      },
      data: {
        hash: refreshTokenPayload.refreshToken,
        expiresAt: refreshTokenPayload.expiresAt,
      },
    });
  }

  async delete(refreshTokenId: string | undefined): Promise<void> {
    await prismaClient.refreshToken.delete({
      where: {
        id: refreshTokenId,
      },
    });
  }
}
