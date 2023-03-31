import { ApiProperty } from '@nestjs/swagger';
import { IsHexadecimal } from 'class-validator';

export class RefreshTokenDTO {
  @IsHexadecimal()
  @ApiProperty()
  refreshToken: string;
}
