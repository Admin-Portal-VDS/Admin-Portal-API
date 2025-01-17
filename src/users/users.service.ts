import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }
  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find({ relations: ['role', 'groups'] });
  }
  async findById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['role', 'groups'],
    });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['role', 'groups'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOne({ where: { id } });
    return updatedUser;
  }
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
