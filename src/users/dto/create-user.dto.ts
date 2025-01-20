import { IsString, IsEmail, IsInt, IsOptional, IsArray } from 'class-validator';
import { GroupEntity } from 'src/groups/entities/group.entity';
import { RoleEntity } from 'src/roles/entities/role.entity';

export class CreateUserDto {
  @IsInt()
  parent_id: number;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  login_name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  role: RoleEntity;

  @IsOptional()
  @IsArray()
  groups?: GroupEntity[];
}
