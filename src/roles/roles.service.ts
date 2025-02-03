import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { BaseService } from 'src/common/base/services/base.service';

@Injectable()
export class RolesService extends BaseService<RoleEntity, string | number> {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {
    super(roleRepository);
  }

  async findAll(): Promise<RoleEntity[]> {
    return super.findAll();
  }

  async findOne(key: keyof RoleEntity, id: string): Promise<RoleEntity> {
    return super.findOne(key, id);
  }

  async create(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    return super.create(createRoleDto);
  }

  async update(
    key: keyof RoleEntity,
    id: string,
    updateRoleDto: UpdateRoleDto,
  ): Promise<RoleEntity> {
    return super.update(key, id, updateRoleDto);
  }

  async delete(key: keyof RoleEntity, id: string): Promise<void> {
    await super.remove(key, id);
  }
}
