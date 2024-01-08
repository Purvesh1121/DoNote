import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Note } from "./Note";

@Entity("Share")
export class Share {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  noteId: number;

  @ManyToOne(() => User, (user) => user.sharedNotes)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Note, (note) => note.shares)
  @JoinColumn({ name: "noteId" })
  note: Note;
}
