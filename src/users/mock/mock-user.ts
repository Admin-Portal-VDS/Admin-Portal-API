import { UserRole } from 'src/roles/enums/user-role.enum';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export const createUserDto = {
  parent_id: 0,
  first_name: 'John',
  last_name: 'Doe',
  login_name: 'johndoe',
  email: 'john.doe@vonage.com',
  role: {
    id: 'SUPERUSER',
    name: UserRole.SUPER_USER,
    label: 'Super User',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
  password: 'abcdef',
  createdBy: 0,
} as CreateUserDto;

export const user = {
  id: 1,
  parent_id: 0,
  first_name: 'John',
  last_name: 'Doe',
  login_name: 'johndoe',
  email: 'john.doe@vonage.com',
  role: {
    id: 'SUPERUSER',
    name: UserRole.SUPER_USER,
    label: 'Super User',
  },
  password: 'hashed_abcdef',
  groups: null,
} as UserEntity;

export const users = [
  {
    ...user,
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    login_name: 'johndoe',
    email: 'john.doe@vonage.com',
    password: 'hashed_password',
  },
  {
    ...user,
    id: 2,
    first_name: 'Jane',
    last_name: 'Doe',
    login_name: 'janedoe',
    email: 'jane.doe@vonage.com',
    password: 'hashed_password_2',
  },
] as UserEntity[];

export const updateUserDto = {
  ...user,
  first_name: 'Jane',
} as UpdateUserDto;

export const updatedUser = {
  ...user,
  id: 1,
  first_name: 'Jane',
} as UserEntity;
