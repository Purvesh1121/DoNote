export interface ICreateNote {
  title: string;
  content: string;
  userId: number;
}

export interface IUpdateNoteById extends Partial<ICreateNote> {
  noteId: number;
  userId: number;
}
