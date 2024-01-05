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
  fromUserId: number;

  @PrimaryColumn()
  toUserId: number;

  @PrimaryColumn()
  noteId: number;

  @ManyToOne(() => User, (user) => user.sharedNotes)
  @JoinColumn({ name: "fromUserId" })
  fromUser: User;

  @ManyToOne(() => User, (user) => user.receivedNotes)
  @JoinColumn({ name: "toUserId" })
  toUser: User;

  @ManyToOne(() => Note, (note) => note.shares)
  @JoinColumn({ name: "noteId" })
  note: Note;
}
