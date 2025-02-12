import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CheckPermission } from 'src/casl/casl-ability.decorator';
import { Action } from 'src/casl/types/actions.enum';
import { UserEntity } from './entities/user.entity';
import { CaslAbilityGuard } from 'src/casl/casl-ability.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @UseGuards(JwtAuthGuard, CaslAbilityGuard)
  @CheckPermission({ action: Action.CREATE, subject: UserEntity })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, CaslAbilityGuard)
  findAll(@Request() req) {
    console.log(req.user);
    return this.userService.findAll();
  }

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

  @Get('search/:key')
  search(@Param('key') key: string) {
    return this.userService.search(key);
  }
}
