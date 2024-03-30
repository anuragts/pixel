"use client";
import { useEffect, useState } from "react";
import { Editor } from "novel";
import { getNoteById } from "@/app/actions";

type Note = {
  content: string;
  id: number;
  title: string;
  userId: number;
};

export default function Page() {
const [note, setNote] = useState<Note | null>(null);

useEffect(() => {
    const fetchData = async () => {
        try {
            const notesData: Note[] = await getNoteById(1);
            console.log(notesData[0].content);
            setNote(notesData[0]); 
            
        } catch (error) {
            console.error(error);
        }
    };

    fetchData();
}, []);

  return (
    <>
      <Editor
        defaultValue={note ? note.content : 'No note found'} 
        key={note?.content}
        completionApi="/api/generate"
        className="text-gray-100 bg-black h-[100vh]"
      />
    </>
  );
}