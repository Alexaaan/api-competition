import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user1: number;

  @Column()
  user2: number;

  @Column({ default: 0 })
  score_user1: number;

  @Column({ default: 0 })
  score_user2: number;
}
