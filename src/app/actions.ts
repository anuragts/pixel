"use server";

import { db } from "@/utils/db/client";
import { users, notes } from "@/utils/db/schema";
import { UserType, NoteType } from "@/utils/types";
import { eq } from "drizzle-orm";

// basic CRUD operations

type createUserType = {
  email: string;
  username: string;
};

type createNoteType ={ 
  title?: string ;
  content?: string ;
  userId?: number ;
}

export async function createUsername(email: string) {
  const parts = email.split("@");

  const usernamePart = parts[0];

  const randomNum = Math.floor(Math.random() * 900) + 100;

  return `${usernamePart}${randomNum}`;
}

export async function getUserbyEmail(email:string) {
  const data = await db.select().from(users).where(eq(users.email, email));
  const user = data[0] || null;
  return user;
}

export async function createUser(user: createUserType) {
  return await db.insert(users).values(user).returning();
}

export async function updateUser(user: UserType) {
  return await db
    .update(users)
    .set(user)
    .where(eq(users.id, user.id))
    .returning();
}

export async function deleteUser(id: number) {
  return await db.delete(users).where(eq(users.id, id)).returning();
}

export async function getNotes(email:string) {
  const n = await db
    .select()
    .from(notes)
    .leftJoin(users, eq(users.id, notes.userId))
    .where(eq(users.email, email));
  console.log(n);
  return n;
}
export async function getNoteById(id: number) {
  const data = await db
    .select()
    .from(notes)
    // .leftJoin(users, eq(users.id, notes.userId))
    .where(eq(notes.id, id));

  const note = data[0] || null; // Take the first element of the array or null if the array is empty

  return JSON.stringify(note); // This will be a JSON string
}

export async function createNote(note: createNoteType) {
  return await db.insert(notes).values(note).returning();
}

export async function updateNote(note: NoteType) {
  return await db
    .update(notes)
    .set(note)
    .where(eq(notes.id, note.id))
    .returning();
}

export async function deleteNote(id: number) {
  return await db.delete(notes).where(eq(notes.id, id)).returning();
}

export async function publishNote(id:number){
  return await db.update(notes).set({published:true}).where(eq(notes.id,id)).returning();
}
