"use client";
import { useEffect } from "react";
import { Editor } from "novel";
import { getNoteById } from "@/app/actions";

export default function page() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const notesData: any = await getNoteById(1);
        console.log(notesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Editor
        completionApi="/api/generate"
        className="text-gray-100 bg-black h-[100vh]"
      />
    </>
  );
}
