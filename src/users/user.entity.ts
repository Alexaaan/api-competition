import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Match } from '../matches/match.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @OneToMany(() => Match, match => match.user1)
  matchesAsUser1: Match[];

  @OneToMany(() => Match, match => match.user2)
  matchesAsUser2: Match[];
}
