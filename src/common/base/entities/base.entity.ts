import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity<ID = number> {
  @PrimaryGeneratedColumn()
  id: ID;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  // @ManyToOne(() => UserEntity, { nullable: true })
  // @JoinColumn({ name: 'createdBy' })
  // createdBy: UserEntity;

  // @ManyToOne(() => UserEntity, { nullable: true })
  // @JoinColumn({ name: 'updatedBy' })
  // updatedBy: UserEntity;

  // @ManyToOne(() => UserEntity, { nullable: true })
  // @JoinColumn({ name: 'deletedBy' })
  // deletedBy: UserEntity;
}
