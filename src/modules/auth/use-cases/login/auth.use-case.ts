// import { GetUserByEmailUseCase } from
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EncryptProvider } from 'src/@shared/providers/encrypt.provider';
import { GetUserByEmailUseCase } from 'src/modules/users/useCases/get-user/get-user.usecase';

@Injectable()
export class AuthUseCase {
  private readonly logger = new Logger(AuthUseCase.name);
  constructor(
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    private encryptProvider: EncryptProvider,
  ) {}

  async validateUser(email: string, password: string) {
    try {
      const user = await this.getUserByEmailUseCase.execute({ email });

      const passwordMatch = await this.encryptProvider.compare(
        user.password,
        password,
      );

      if (passwordMatch) {
        this.logger.log('Login session created successfully');
        return user;
      }
      const error = new BadRequestException('Login');
      this.logger.error(error.message);

      return undefined;
    } catch (error) {
      if (error instanceof NotFoundException) return undefined;
      throw error;
    }
  }
}
