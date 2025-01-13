import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleEntity } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @Get()
  async findAll(): Promise<RoleEntity[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RoleEntity> {
    return this.roleService.findOne(id);
  }

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    return this.roleService.create(createRoleDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<RoleEntity> {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.roleService.delete(id);
  }
}
