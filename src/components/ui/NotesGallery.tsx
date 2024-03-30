"use client";

import { useEffect, useState } from "react";
import { getNotes } from "@/app/actions";

// Define types
type Note = {
  id: number;
  title: string;
  content: string;
  userId: number;
};

type User = {
  id: number;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;    
};

type NoteData = {
  notes: Note;
  users: User;
};

export default function NotesGallery() {
type User = {
    id: number;
    email: string;
    username: string | null;
    createdAt: string | null;
    updatedAt: string | null;
};

const [notes, setNotes] = useState<Note[]>([]);
useEffect(() => {
    const fetchData = async () => {
        try {
            const notesData: any = await getNotes();
            setNotes(notesData.map((noteData: NoteData) => noteData.notes)); 
        } catch (error) {
            console.error(error);
        }
    };

    fetchData();
}, []);
  return (
    <div>
      NotesGallery
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.title}
          </li>
        ))}
      </ul>
    </div>
  );
}