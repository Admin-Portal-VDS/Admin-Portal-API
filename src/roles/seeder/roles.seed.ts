import { Injectable } from '@nestjs/common';
import { UserRole } from '../enums/user-role.enum';
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
    const roles = [
      { id: 'SUPER_USER', name: UserRole.SUPER_USER, label: 'Super User' },
      {
        id: 'ACCOUNT_ADMINISTRATOR',
        name: UserRole.ACCOUNT_ADMINISTRATOR,
        label: 'Account Administrator',
      },
      {
        id: 'BILLING_ADMINISTRATOR',
        name: UserRole.BILLING_ADMINISTRATOR,
        label: 'Billing Administrator',
      },
      {
        id: 'CALL_QUEUE_ADMINISTRATOR',
        name: UserRole.CALL_QUEUE_ADMINISTRATOR,
        label: 'Call Queue Administrator',
      },
      {
        id: 'CALL_QUEUE_REPORTING_ADMINISTRATOR',
        name: UserRole.CALL_QUEUE_REPORTING_ADMINISTRATOR,
        label: 'Call Queue Reporting Administrator',
      },
      {
        id: 'REPORTS_ADMINISTRATOR',
        name: UserRole.REPORTS_ADMINISTRATOR,
        label: 'Reports Administrator',
      },
      {
        id: 'USER_ADMINISTRATOR',
        name: UserRole.USER_ADMINISTRATOR,
        label: 'User Administrator',
      },
      { id: 'END_USER', name: UserRole.END_USER, label: 'End User' },
      {
        id: 'END_USER_NO_DASHBOARD',
        name: UserRole.END_USER_NO_DASHBOARD,
        label: 'End User (No Dashboard)',
      },
    ];

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
