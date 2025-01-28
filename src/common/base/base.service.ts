import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity } from './entities/base.entity';

@Injectable()
export abstract class BaseService<T extends BaseEntity> {
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

  async findOne(id: number, options?: Options): Promise<T> {
    try {
      const entity = await this.repository.findOne({
        where: { id } as FindOptionsWhere<T>,
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

  async update(id: any, updateDto: QueryDeepPartialEntity<T>): Promise<T> {
    try {
      await this.findOne(id);
      await this.repository.update(id, updateDto as QueryDeepPartialEntity<T>);
      return this.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(
        `Failed to update entity with ID ${id}: ${error.message}`,
      );
    }
  }

  async remove(id: number): Promise<T> {
    try {
      if (this.repository.metadata.deleteDateColumn) {
        await this.repository.softDelete(id);
      } else {
        await this.repository.delete(id);
      }
      const deletedEntity = await this.findOne(id, { withDeleted: true });
      return deletedEntity;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(
        `Failed to remove entity with ID ${id}: ${error.message}`,
      );
    }
  }
}
