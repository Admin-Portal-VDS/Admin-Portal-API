import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseEntity } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BaseEntity])],
})
export class BaseModule {}
