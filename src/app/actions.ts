"use server";

import { db } from "@/utils/db/client";
import { users, notes } from "@/utils/db/schema";
import { UserType, NoteType } from "@/utils/types";
import { eq } from "drizzle-orm";

// basic CRUD operations

export async function createUser(user: UserType) {
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

export async function getNotes() {
  const n = await db
    .select()
    .from(notes)
    .leftJoin(users, eq(users.id, notes.userId))
    .where(eq(users.id, 1));
    console.log(n);
  return n;
}

export async function getNoteById(id: number) {
  return await db
    .select()
    .from(notes)
    // .leftJoin(users, eq(users.id, notes.userId))
    .where(eq(notes.id, id))
}

export async function createNote(note: NoteType) {
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
