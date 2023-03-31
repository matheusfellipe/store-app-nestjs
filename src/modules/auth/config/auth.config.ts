import { randomUUID } from 'crypto';

export const authConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
  refreshTokenExpiresIn: Number(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN), // metric in hours
  audience: process.env.JWT_AUDIENCE,
  issuer: process.env.JWT_ISSUER,
  jwtId: randomUUID(),
};
