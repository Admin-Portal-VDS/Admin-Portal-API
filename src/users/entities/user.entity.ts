import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RoleEntity } from "src/roles/entities/role.entity";
import { GroupEntity } from "src/groups/entities/group.entity";

@Entity('user')
export class UserEntity {

@PrimaryGeneratedColumn()
id: number;

@Column()
first_name: string; // "John"

@Column()
last_name: string; // "Doe"

@Column()
login_name: string; // "johndoe"

@Column()
email: string; // "john.doe@vonage.com"

@ManyToOne(()=>RoleEntity)
@JoinColumn({name: "role_id"})
role: RoleEntity

@ManyToMany(()=>GroupEntity)
@JoinTable({  
    name: "user_groups", 
    joinColumn: {
        name: "user_id", 
        referencedColumnName: "id"
    },
    inverseJoinColumn: {
        name: "group_id", 
        referencedColumnName: "id"
    }})
groups: GroupEntity[];

@CreateDateColumn({ type: "timestamptz"})
created_at: Date;
}

