import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async findAll(): Promise<RoleEntity[]> {
    return this.roleRepository.find();
  }

  async findOne(id: string): Promise<RoleEntity> {
    return this.roleRepository.findOne({ where: { id } });
  }

  async create(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    const newRole = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(newRole);
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<RoleEntity> {
    await this.roleRepository.update(id, updateRoleDto);
    return this.roleRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.roleRepository.delete(id);
  }
}
