import { InferSubjects } from '@casl/ability';
import { GroupEntity } from 'src/groups/entities/group.entity';
import { RoleEntity } from 'src/roles/entities/role.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export type Subject =
  | InferSubjects<typeof UserEntity | typeof RoleEntity | typeof GroupEntity>
  | 'all';
