import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/datasource';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { GroupsModule } from './groups/groups.module';
import { CaslModule } from './casl/casl.module';
import { TempModule } from './temp/temp.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    RolesModule,
    GroupsModule,
    CaslModule,
    TempModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
