import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/datasource';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { GroupsModule } from './groups/groups.module';
import { CaslModule } from './casl/casl.module';
import { SeederModule } from './roles/seeder/seeder.module';
import { AppSeederService } from './app.seed';
import { AuthModule } from './auth/auth.module';
import { PasswordModule } from './password/password.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    RolesModule,
    GroupsModule,
    CaslModule,
    SeederModule,
    AuthModule,
    PasswordModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppSeederService],
})
export class AppModule {}
