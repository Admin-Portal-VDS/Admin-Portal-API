import { IsString } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

export class CreateRoleDto {
  name: UserRole;

  @IsString()
  label: string;
}
