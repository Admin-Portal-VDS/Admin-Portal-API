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
import { GroupEntity } from 'src/groups/entities/group.entity';
import { RoleEntity } from 'src/roles/entities/role.entity';

export type AppAbility = PureAbility<[Action, Subject]>;

@Injectable()
export class CaslAbilityFactory {
  defineAbilityFor(user: UserEntity) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      PureAbility as AbilityClass<AppAbility>,
    );

    switch (user.role.name) {
      case UserRole.SUPER_USER:
        can(Action.MANAGE, 'all');
        break;
      case UserRole.BILLING_ADMINISTRATOR:
        break;
      case UserRole.ACCOUNT_ADMINISTRATOR:
        can(Action.MANAGE, UserEntity);
        can(Action.MANAGE, GroupEntity);
        can(Action.MANAGE, RoleEntity);
        break;
      case UserRole.CALL_QUEUE_ADMINISTRATOR:
        break;
      case UserRole.CALL_QUEUE_REPORTING_ADMINISTRATOR:
        break;

      case UserRole.REPORTS_ADMINISTRATOR:
        break;

      case UserRole.USER_ADMINISTRATOR:
        can(Action.MANAGE, UserEntity);
        can(Action.READ, GroupEntity);
        can(Action.READ, RoleEntity);
        cannot(Action.DELETE, UserEntity);
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
