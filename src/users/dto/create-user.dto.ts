import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({ example: 'john_doe' })
  @IsNotEmpty()
  @IsString()
  login_name: string;

  @ApiProperty({ example: 'johndoe@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Test@1234' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsObject()
  role: RoleEntity;

  @IsArray()
  @IsOptional()
  groups?: GroupEntity[];
}
