import { IsString } from 'class-validator';

export class GetUserByEmailDTO {
  @IsString() // TODO: IsCPF
  email: string;
}
