import { InferSubjects } from '@casl/ability';
import { RoleEntity } from 'src/roles/entities/role.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export type Subject =
  | InferSubjects<typeof UserEntity | typeof RoleEntity>
  | 'all';
