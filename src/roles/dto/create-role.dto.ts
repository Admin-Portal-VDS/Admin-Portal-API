import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsEnum(UserRole, { message: 'name must be a valid UserRole' })
  name: UserRole;

  @IsString()
  @IsNotEmpty()
  label: string;
}
