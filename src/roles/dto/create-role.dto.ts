import { IsString } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';
export class CreateRoleDto {
  @IsString()
  id: string;
  name: UserRole;
  @IsString()
  label: string;
}
