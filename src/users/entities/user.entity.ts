import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RoleEntity } from "src/roles/entities/role.entity";

@Entity('users')
export class UserEntity {

@PrimaryGeneratedColumn()
id: number

@Column()
first_name: string // "John"

@Column()
last_name: string // "Doe"

@Column()
login_name: string // "johndoe"

@Column()
email: string // "john.doe@vonage.com"

@ManyToOne(()=>RoleEntity)
role: RoleEntity

@CreateDateColumn()
created_at: Date
}

