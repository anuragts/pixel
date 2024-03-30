'use server'

import { db } from "@/utils/db/client"
import { users } from "@/utils/db/schema"
import { UserType } from "@/utils/types"
import { eq } from 'drizzle-orm';

export async function createUser(user: UserType){
    return db.insert(users).values(user).returning();
}

export async function updateUser(user: UserType) {
    return db.update(users).set(user).where(eq(users.id, user.id)).returning();
  }
  
  export async function deleteUser(id: number) {
    return db.delete(users).where(eq(users.id, id)).returning();
  }