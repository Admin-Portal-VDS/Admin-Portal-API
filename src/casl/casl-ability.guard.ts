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
import { dummyUser } from 'src/users/mock/dummy-user';

@Injectable()
export class CaslAbilityGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules =
      this.reflector.get<Permission[]>(
        CHECK_PERMISSION,
        context.getHandler(),
      ) || [];

    const user = dummyUser;
    const ability = this.caslAbilityFactory.defineAbilityFor(user);

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
