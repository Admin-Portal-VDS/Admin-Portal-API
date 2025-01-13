import { Column, Entity, PrimaryColumn } from 'typeorm';
import { UserRole } from '../enums/user-role.enum';

@Entity('role')
export class RoleEntity {
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
}
