import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { PasswordService } from 'src/password/password.service';
import { UserRole } from 'src/roles/enums/user-role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let userService: UsersService;
  let userRepository: Repository<UserEntity>;
  let passwordService: PasswordService;

  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  const mockPasswordService = {
    hashPassword: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        },
        {
          provide: PasswordService,
          useValue: mockPasswordService,
        },
      ],
    }).compile();
    userService = module.get(UsersService);
    userRepository = module.get(getRepositoryToken(UserEntity));
    passwordService = module.get(PasswordService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('should hash the password, create and save the user', async () => {
      const mockRole = {
        id: 'SUPERUSER',
        name: UserRole.SUPER_USER,
        label: 'Super User',
      };

      const createUserDto = {
        parent_id: 0,
        first_name: 'John',
        last_name: 'Doe',
        login_name: 'johndoe',
        email: 'john.doe@vonage.com',
        role: mockRole,
        password: 'abcdef',
        createdBy: 0,
      } as CreateUserDto;

      const hashedPassword = 'hashed_abcdef';

      const savedUser = {
        id: 1,
        parent_id: 0,
        first_name: 'John',
        last_name: 'Doe',
        login_name: 'johndoe',
        email: 'john.doe@vonage.com',
        role: {
          id: 'SUPERUSER',
          name: UserRole.SUPER_USER,
          label: 'Super User',
        },
        password: hashedPassword,
        groups: null,
        created_at: new Date(),
        createdBy: 0,
      } as UserEntity;

      jest
        .spyOn(passwordService, 'hashPassword')
        .mockResolvedValue(hashedPassword);
      jest
        .spyOn(userRepository, 'create')
        .mockReturnValue(savedUser as UserEntity);
      jest
        .spyOn(userRepository, 'save')
        .mockResolvedValue(savedUser as UserEntity);

      const result = await userService.create(createUserDto);
      const { password, ...rest } = createUserDto;
      expect(passwordService.hashPassword).toHaveBeenCalledWith(password);
      expect(userRepository.create).toHaveBeenCalledWith({
        ...rest,
        password: hashedPassword,
      });
      expect(userRepository.save).toHaveBeenCalledWith(savedUser);
      expect(result).toEqual(savedUser);
    });
  });
});
