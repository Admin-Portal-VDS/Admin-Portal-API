import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RoleEntity } from "src/roles/entities/role.entity";
import { GroupEntity } from "src/groups/entities/group.entity";

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

@ManyToMany(()=>GroupEntity)
@JoinTable()
groups: GroupEntity[]

@CreateDateColumn()
created_at: Date
}

