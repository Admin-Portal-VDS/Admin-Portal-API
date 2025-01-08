import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class RoleEntity {

    @PrimaryGeneratedColumn()
    id: number // 1

    @Column({ unique: true })
    code: string;  // e.g., "END_USER", "USER_ADMIN"

    @Column()
    label: string // End User, User Admin
    
}