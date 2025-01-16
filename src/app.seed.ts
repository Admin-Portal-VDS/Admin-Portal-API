import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { RoleSeederService } from './roles/seeder/roles.seed';

@Injectable()
export class AppSeederService implements OnApplicationBootstrap {
  constructor(private readonly roleSeederService: RoleSeederService) {}

  async onApplicationBootstrap() {
    await this.seed();
  }

  private async seed() {
    await this.roleSeederService.seed();
  }
}
