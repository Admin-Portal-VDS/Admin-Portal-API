import { Injectable } from '@nestjs/common';
import { roles } from '../data/roles.data';
import { Repository } from 'typeorm';
import { RoleEntity } from '../entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleSeederService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async seed() {
    for (const role of roles) {
      const exists = await this.roleRepository.findOne({
        where: { id: role.id },
      });
      if (!exists) {
        await this.roleRepository.save(this.roleRepository.create(role));
      }
    }
  }
}
