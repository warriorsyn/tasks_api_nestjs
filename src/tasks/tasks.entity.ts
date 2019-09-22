import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { StatusProgress } from './tasks-status.enum';

@Entity()
export class Tasks extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: StatusProgress;
}
