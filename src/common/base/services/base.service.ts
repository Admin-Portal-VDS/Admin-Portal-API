import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity } from '../entities/base.entity';

@Injectable()
export abstract class BaseService<T extends BaseEntity<ID>, ID> {
  constructor(protected readonly repository: Repository<T>) {}

  async create(createDto: DeepPartial<T>): Promise<T> {
    try {
      const entity = this.repository.create(createDto);
      return await this.repository.save(entity);
    } catch (error) {
      throw new BadRequestException(
        `Failed to create entity: ${error.message}`,
      );
    }
  }

  async findAll(relations?: string[]): Promise<T[]> {
    try {
      const options = relations ? { relations } : {};
      return await this.repository.find(options);
    } catch (error) {
      throw new BadRequestException(
        `Failed to find entities: ${error.message}`,
      );
    }
  }

  async findOne(key: keyof T, id: ID, options?: Options): Promise<T> {
    try {
      const whereCondition = { [key]: id } as FindOptionsWhere<T>;
      const entity = await this.repository.findOne({
        where: whereCondition,
        relations: options?.relations || [],
        withDeleted: options?.withDeleted === true,
      });

      if (!entity) {
        throw new NotFoundException(`Entity not found`);
      }

      return entity;
    } catch (error) {
      console.error('FindOne Error:', error); // Add detailed logging
      if (error instanceof NotFoundException) throw error;

      throw new BadRequestException(error);
    }
  }

  async update(
    key: keyof T,
    id: ID,
    updateDto: QueryDeepPartialEntity<T>,
  ): Promise<T> {
    try {
      const whereCondition = { [key]: id } as FindOptionsWhere<T>;
      await this.findOne(key, id);
      await this.repository.update(
        whereCondition,
        updateDto as QueryDeepPartialEntity<T>,
      );
      return this.findOne(key, id);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(
        `Failed to update entity with ID ${id}: ${error.message}`,
      );
    }
  }
  async remove(key: keyof T, id: ID): Promise<T> {
    try {
      const whereCondition = { [key]: id } as FindOptionsWhere<T>;

      await this.repository.softDelete(whereCondition);

      const deletedEntity = await this.findOne(key, id, { withDeleted: true });
      return deletedEntity;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(
        `Failed to remove entity with ID ${id}: ${error.message}`,
      );
    }
  }
}
