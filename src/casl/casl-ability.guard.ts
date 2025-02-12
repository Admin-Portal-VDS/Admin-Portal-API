import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from './casl-ability.factory';
import { CHECK_PERMISSION, Permission } from './casl-ability.decorator';
import { ForbiddenError } from '@casl/ability';
import { IS_PUBLIC } from 'src/auth/auth.decorator';

@Injectable()
export class CaslAbilityGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }
    const rules =
      this.reflector.get<Permission[]>(
        CHECK_PERMISSION,
        context.getHandler(),
      ) || [];
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }
    const ability = this.caslAbilityFactory.defineAbilityFor(user.user);

    try {
      rules.forEach((rule) =>
        ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject),
      );
      return true;
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }
}
