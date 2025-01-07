import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRoles } from "../enums/user-roles.enum";

@Entity('users')
export class UserEntity {

@PrimaryGeneratedColumn()
id: number

@Column()
name: string

@Column()
username: string

@Column()
phone_no: number

@Column()
email: string


@Column({type: "enum",enum:UserRoles,array:true,default:[UserRoles.USER]})
roles: UserRoles[]

@CreateDateColumn()
created_at: Date
}
