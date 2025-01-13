import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../enums/user-role.enum';

@Entity('role')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number; // 1

  @Column({
    type: 'enum',
    enum: UserRole,
    unique: true,
    default: UserRole.SUPER_USER,
  })
  name: UserRole;
}
