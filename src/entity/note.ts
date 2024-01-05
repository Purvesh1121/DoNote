import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("note")
export class Note {
  @PrimaryGeneratedColumn()
  noteId: number;
}
