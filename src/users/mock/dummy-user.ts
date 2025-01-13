import { UserRole } from 'src/roles/enums/user-role.enum';
import { UserEntity } from '../entities/user.entity';

export const dummyUser: UserEntity = {
  id: 1,
  parent_id: 0,
  first_name: 'John',
  last_name: 'Doe',
  login_name: 'johndoe',
  email: 'john.doe@vonage.com',
  role: {
    id: 'USER_ADMINISTRATOR',
    name: UserRole.USER_ADMINISTRATOR,
    label: 'User Administrator',
  },
  groups: null,
  created_at: new Date(),
  createdBy: 0,
};
