import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { GroupStatus } from "../enums/group-status.enum";


@Entity('groups')
export class GroupEntity {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name: string

    @Column({ type: "varchar", length: 500 })
    description: string;

    @Column({ type: "timestamptz" })
    created_at: Date;

    @Column({ type: "timestamptz" })
    last_update_at: Date;

    @Column({type: "enum", enum: GroupStatus, default: GroupStatus.ACTIVE})
    status: GroupStatus

    @Column({ type: "timestamptz", nullable: true })
    deleted_at: Date | null;
  
}
