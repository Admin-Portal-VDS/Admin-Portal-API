import {
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  PureAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { Action } from './types/actions.enum';
import { Subject } from './types/subjects.type';
import { UserRole } from 'src/roles/enums/user-role.enum';

export type AppAbility = PureAbility<[Action, Subject]>;

@Injectable()
export class CaslAbilityFactory {
  defineAbilityFor(user: UserEntity) {
    const { can, build } = new AbilityBuilder<AppAbility>(
      PureAbility as AbilityClass<AppAbility>,
    );

    switch (user.role.name) {
      case UserRole.SUPER_USER:
        can(Action.MANAGE, 'all');
        break;

      case UserRole.ACCOUNT_ADMINISTRATOR:
        break;
      case UserRole.CALL_QUEUE_ADMINISTRATOR:
        break;
      case UserRole.CALL_QUEUE_REPORTING_ADMINISTRATOR:
        break;

      case UserRole.REPORTS_ADMINISTRATOR:
        break;

      case UserRole.USER_ADMINISTRATOR:
        break;

      case UserRole.END_USER:
        break;

      case UserRole.END_USER_NO_DASHBOARD:
        break;
    }
    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subject>,
    });
  }
}
