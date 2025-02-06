import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupEntity } from './entities/group.entity';
import { BaseService } from 'src/common/base/services/base.service';

@Injectable()
export class GroupsService extends BaseService<GroupEntity, string | number> {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
  ) {
    super(groupRepository);
  }
}
