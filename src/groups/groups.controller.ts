import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupEntity } from './entities/group.entity';
import { UpdateGroupDto } from './dto/update-group.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  async create(@Body() createGroupDto: CreateGroupDto): Promise<GroupEntity> {
    return this.groupsService.create(createGroupDto);
  }

  @Get()
  async findAll(): Promise<GroupEntity[]> {
    return this.groupsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<GroupEntity> {
    return this.groupsService.findOne('id', id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ): Promise<GroupEntity> {
    return this.groupsService.update('id', id, updateGroupDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<GroupEntity> {
    return this.groupsService.remove('id', id);
  }
}
