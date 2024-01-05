import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Share } from "./Share";

@Entity("note")
export class Note {
  @PrimaryGeneratedColumn()
  noteId: number;

  @Column({ unique: true })
  title: string;

  @Column()
  content: string;

  @Column()
  authorId: number;

  @ManyToOne(() => User, (user) => user.notes)
  @JoinColumn({ name: "authorId" })
  author: User;

  @OneToMany(() => Share, (share) => share.note)
  shares: Share[];
}
