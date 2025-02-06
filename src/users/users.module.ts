import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { SearchModule } from 'src/search/search/search.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), SearchModule],
  providers: [UsersService, CaslAbilityFactory],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
