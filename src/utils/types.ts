export type UserType = {
  id: number;
  email: string;
  username: string;
};

export type NoteType = {
  id: number;
  title?: string;
  content?: string;
  userId?: number;
};
