"use client";
import { useEffect, useState } from "react";
import { getNotes } from "@/app/actions";
import { createClient } from "@/utils/supabase/client";
import PublishNote from "./PublishNote";
import Link from "next/link";

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

const NotesGallery = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (!error && data) {
        const email = data?.user?.email;
        try {
          const notesData: any = await getNotes(email as string);
          setNotes(notesData.map((noteData: NoteData) => noteData.notes));
        } catch (error) {
          console.error(error);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-4">Notes Gallery</h2>
      <ul>
        {notes.map((note) => (
          <li
            key={note.id}
            className="border border-gray-300 p-4 my-2 rounded flex justify-between items-center"
          >
            <Link href={`/note/${note.id}`}>{note.title}</Link>
            <Link
              href={`/chat/${note.id}`}
              className="bg-secondary py-2 px-4 rounded-lg"
            >
              Chat
            </Link>
            <PublishNote id={note.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesGallery;
