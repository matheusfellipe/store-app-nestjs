import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, IStrategyOptionsWithRequest } from 'passport-local';
import { AuthUseCase } from '../use-cases/login/auth.use-case';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authUseCase: AuthUseCase) {
    super({
      usernameField: 'email',
    } as IStrategyOptionsWithRequest);
  }

  async validate(email: string, password: string) {
    const student = await this.authUseCase.validateUser(email, password);
    if (!student)
      throw new UnauthorizedException('Email or password is incorrect');
    return student;
  }
}
