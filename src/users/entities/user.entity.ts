import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  Unique,
} from 'typeorm';
import { RoleEntity } from 'src/roles/entities/role.entity';
import { GroupEntity } from 'src/groups/entities/group.entity';
import { BaseEntity } from 'src/common/base/entities/base.entity';
import { Exclude } from 'class-transformer';

@Entity('user')
@Unique(['email'])
export class UserEntity extends BaseEntity {
  @Column({ nullable: true })
  parent_id: number;

  @Column({ nullable: true })
  first_name: string; // "John"

  @Column({ nullable: true })
  last_name: string; // "Doe"

  @Column({ nullable: true })
  login_name: string; // "johndoe"

  @Column()
  email: string; // "john.doe@vonage.com"

  @Column()
  @Exclude()
  password: string;

  @ManyToOne(() => RoleEntity)
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  @ManyToMany(() => GroupEntity)
  @JoinTable({
    name: 'user_groups',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
    },
  })
  groups: GroupEntity[];
}
