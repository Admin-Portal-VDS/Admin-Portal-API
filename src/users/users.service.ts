import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordService } from 'src/password/password.service';
import { BaseService } from 'src/common/base/services/base.service';

@Injectable()
export class UsersService extends BaseService<UserEntity, string | number> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly passwordService: PasswordService,
  ) {
    super(userRepository);
  }

  async create(createUserDto): Promise<UserEntity> {
    const { password, ...rest } = createUserDto;
    const hashedPassword = await this.passwordService.hashPassword(password);
    return super.create({ ...rest, password: hashedPassword });
  }
  async findAll(): Promise<UserEntity[]> {
    return super.findAll(['role', 'groups']);
  }
  async findOne(
    key: keyof UserEntity,
    id: string | number,
    options?: Options,
  ): Promise<UserEntity> {
    const newOptions = { ...options, relations: ['role', 'groups'] };
    return super.findOne(key, id, newOptions);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['role', 'groups'],
    });
    if (!user) {
      throw new NotFoundException(`No user found with email ${email}`);
    }
    return user;
  }

  async update(
    key: keyof UserEntity,
    id: string | number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const updatedUser = await super.update(key, id, updateUserDto);
    return updatedUser;
  }
}
