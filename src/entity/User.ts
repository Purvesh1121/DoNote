import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Note } from "./Note";
import { Share } from "./Share";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Note, (note) => note.author)
  notes: Note[];

  @OneToMany(() => Share, (share) => share.fromUser)
  sharedNotes: Share[];

  @OneToMany(() => Share, (share) => share.toUser)
  receivedNotes: Share[];
}
