import { Column, Entity } from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { BaseEntity } from 'src/common/base/entities/base.entity';

@Entity('role')
export class RoleEntity extends BaseEntity {
  @Column({
    type: 'enum',
    enum: UserRole,
    unique: true,
    default: UserRole.SUPER_USER,
  })
  name: UserRole;

  @Column()
  label: string;
}
