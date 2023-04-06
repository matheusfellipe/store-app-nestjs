import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly logger: Logger) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return false;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return this.matchRoles(roles, user.userRole);
  }

  private matchRoles(roles: string[], userRole: string) {
    const roleIsValid = roles.find((role) => role === userRole);

    if (!roleIsValid) {
      const error = new ForbiddenException('Role');
      this.logger.error(error.message);
      throw new ForbiddenException('Role not allowed');
    }

    return true;
  }
}
