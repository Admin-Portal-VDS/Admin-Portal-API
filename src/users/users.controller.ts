import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { CheckPermission } from 'src/casl/casl-ability.decorator';
import { Action } from 'src/casl/types/actions.enum';
import { UserEntity } from './entities/user.entity';
import { Public } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Public()
  @Post()
  @CheckPermission({ action: Action.CREATE, subject: UserEntity })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    const parsedId = isNaN(Number(id)) ? id : Number(id);
    const key: keyof UserEntity = isNaN(Number(id)) ? 'email' : 'id';
    return this.userService.findOne(key, parsedId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const parsedId = isNaN(Number(id)) ? id : Number(id);
    const key: keyof UserEntity = isNaN(Number(id)) ? 'email' : 'id';
    return this.userService.update(key, parsedId, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const parsedId = isNaN(Number(id)) ? id : Number(id);
    const key: keyof UserEntity = isNaN(Number(id)) ? 'email' : 'id';
    return this.userService.remove(key, parsedId);
  }
}
