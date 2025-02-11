import {
  IsString,
  IsEmail,
  IsInt,
  IsArray,
  IsOptional,
  IsObject,
  IsNotEmpty,
} from 'class-validator';
import { GroupEntity } from 'src/groups/entities/group.entity';
import { RoleEntity } from 'src/roles/entities/role.entity';

export class CreateUserDto {
  @IsInt()
  @IsOptional()
  parent_id?: number;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  login_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsObject()
  role: RoleEntity;

  @IsArray()
  @IsOptional()
  groups?: GroupEntity[];
}
