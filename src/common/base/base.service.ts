import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export abstract class BaseService<T> {
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

  async findOne(id: any, relations?: string[]): Promise<T> {
    try {
      const entity = await this.repository.findOne({
        where: { id } as any,
        relations: relations || [],
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

  async remove(id: any): Promise<T> {
    try {
      const toBeDeleted = await this.findOne(id);
      if (this.repository.metadata.deleteDateColumn) {
        await this.repository.softDelete(id);
      } else {
        const result = await this.repository.delete(id);
        if (result.affected === 0) {
          throw new NotFoundException(`Entity with ID ${id} not found`);
        }
      }
      return toBeDeleted;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(
        `Failed to remove entity with ID ${id}: ${error.message}`,
      );
    }
  }
}
