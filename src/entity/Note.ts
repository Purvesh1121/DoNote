import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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
  userId: number; // Id of user who has created the note

  @ManyToOne(() => User, (user) => user.notes)
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(() => Share, (share) => share.note)
  shares: Share[];
}
