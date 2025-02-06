import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { GroupStatus } from '../enums/group-status.enum';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(500)
  @IsOptional()
  description?: string;

  @IsEnum(GroupStatus)
  @IsOptional()
  status?: GroupStatus = GroupStatus.ACTIVE;
}
