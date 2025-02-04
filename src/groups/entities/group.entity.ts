import { Column, Entity } from 'typeorm';
import { GroupStatus } from '../enums/group-status.enum';
import { BaseEntity } from 'src/common/base/entities/base.entity';

@Entity('group')
export class GroupEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @Column({ type: 'enum', enum: GroupStatus, default: GroupStatus.ACTIVE })
  status: GroupStatus;
}
