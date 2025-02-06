import { DeepPartial, Repository } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
import { BaseService } from '../services/base.service';
import { mock, MockProxy } from 'jest-mock-extended';
import { Test, TestingModule } from '@nestjs/testing';

class TestEntity extends BaseEntity<number> {
  name: string;
}

class TestService extends BaseService<TestEntity, number> {}

describe('BaseService', () => {
  let service: TestService;
  let repository: MockProxy<Repository<TestEntity>>;

  beforeEach(async () => {
    repository = mock<Repository<TestEntity>>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [TestService, { provide: Repository, useValue: repository }],
    }).compile();

    service = module.get<TestService>(TestService);
  });

  describe('create', () => {
    it('should create and save an entity', async () => {
      const createDto: DeepPartial<TestEntity> = { name: 'Test' };
      const entity = {
        id: 1,
        name: 'Test',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      } as TestEntity;

      repository.create.mockReturnValue(entity);
      repository.save.mockResolvedValue(entity);

      const result = await service.create(createDto);

      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(repository.save).toHaveBeenCalledWith(entity);
      expect(result).toEqual(entity);
    });
  });

  describe('findAll', () => {
    it('should return all entities', async () => {
      const entities = [
        {
          id: 1,
          name: 'Test',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ] as TestEntity[];

      repository.find.mockResolvedValue(entities);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(entities);
    });
  });

  describe('findOne', () => {
    it('should return an entity', async () => {
      const entity = {
        id: 1,
        name: 'Test',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      } as TestEntity;

      repository.findOne.mockResolvedValue(entity);

      const result = await service.findOne('id', 1);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: [],
        withDeleted: false,
      });
      expect(result).toEqual(entity);
    });
  });

  describe('update', () => {
    it('should update an entity', async () => {
      const updateDto = { name: 'Updated Test' };
      const existingEntity = {
        id: 1,
        name: 'Test',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      } as TestEntity;
      const updatedEntity = {
        ...existingEntity,
        name: 'Updated Test',
        updatedAt: new Date(),
      } as TestEntity;

      repository.findOne.mockResolvedValueOnce(existingEntity);
      repository.update.mockResolvedValue(undefined);
      repository.findOne.mockResolvedValueOnce(updatedEntity);

      const result = await service.update('id', 1, updateDto);

      expect(repository.findOne).toHaveBeenNthCalledWith(1, {
        where: { id: 1 },
        relations: [],
        withDeleted: false,
      });

      expect(repository.update).toHaveBeenCalledWith({ id: 1 }, updateDto);

      expect(repository.findOne).toHaveBeenNthCalledWith(2, {
        where: { id: 1 },
        relations: [],
        withDeleted: false,
      });

      expect(result).toEqual(updatedEntity);
    });
  });

  describe('remove', () => {
    it('should soft delete the entity', async () => {
      const entity = {
        id: 1,
        name: 'Test',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      } as TestEntity;

      repository.findOne.mockResolvedValueOnce(entity);
      repository.softDelete.mockResolvedValue(undefined);

      const result = await service.remove('id', 1);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: [],
        withDeleted: true,
      });

      expect(repository.softDelete).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(entity);
    });
  });
});
