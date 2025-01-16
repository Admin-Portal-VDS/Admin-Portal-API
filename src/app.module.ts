import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/datasource';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { GroupsModule } from './groups/groups.module';
import { CaslModule } from './casl/casl.module';
import { APP_GUARD } from '@nestjs/core';
import { CaslAbilityGuard } from './casl/casl-ability.guard';
import { SeederModule } from './roles/seeder/seeder.module';
import { AppSeederService } from './app.seed';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    RolesModule,
    GroupsModule,
    CaslModule,
    SeederModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppSeederService,
    {
      provide: APP_GUARD,
      useClass: CaslAbilityGuard,
    },
  ],
})
export class AppModule {}
