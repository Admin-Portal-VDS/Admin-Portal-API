import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { BaseEntity } from 'src/common/base/entities/base.entity';

@Entity('role')
export class RoleEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    unique: true,
    default: UserRole.SUPER_USER,
  })
  name: UserRole;

  @Column()
  label: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt: Date;
}
