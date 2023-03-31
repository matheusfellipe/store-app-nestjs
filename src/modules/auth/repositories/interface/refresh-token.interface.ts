import { RefreshToken } from '@prisma/client';

export interface InputCreateRefreshTokenRepository {
  refreshToken: string;
  userId: string;
  expiresAt: Date;
}

export type OutputFindRefreshTokenRepository = RefreshToken | null;

export interface InputFindRefreshTokenRepository {
  userId: string;
  refreshToken: string;
}

export interface InputUpdateRefreshTokenRepository {
  id: string;
  refreshToken: string;
  expiresAt: Date;
}
