"use client";

import { useEffect, useState } from "react";
import { getNoteById } from "@/app/actions";
import { useChat } from "ai/react";

type Note = {
  content: string;
  id: number;
  title: string;
  userId: number;
};

export default function Page({ params }: { params: { id: number } }) {
  const [note, setNote] = useState<string>(" ");
  const [isLoading, setIsLoading] = useState(true);
  const [formInput, setFormInput] = useState<string>("");
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    body: {
      content: note,
    },
  });

  const id = params.id;

  const loadData = async () => {
    try {
      setIsLoading(true);
      const response = await getNoteById(id);
      setIsLoading(false);
      return response;
    } catch (error) {
      console.error("Error loading data from cloud:", error);
      setIsLoading(false);
      return null;
    }
  };

  useEffect(() => {
    const getData = async () => {
      const cloud = await loadData();
      if (cloud) {
        const parsedCloud = JSON.parse(cloud);
        setNote(parsedCloud.content);
      }
    };

    void getData();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex">
        <div className="w-1/2 p-4">
            <h2 className="text-2xl font-bold mb-4">Note Content:</h2>
            <p>{note}</p>
        </div>
          <div className="w-1/2 p-4">
            <h2 className="text-2xl font-bold mb-4">Chat:</h2>
            <ul>
              {messages.map((m, index) => (
                <li key={index} className="mb-2">
                  <strong>{m.role === "user" ? "User: " : "AI: "}</strong>
                  {m.content}
                </li>
              ))}
            </ul>
            <form onSubmit={handleSubmit} className="mt-4">
              <label>
                Say something...
                <input
                  value={input}
                  onChange={handleInputChange}
                  className="border rounded p-2 w-full"
                />
              </label>
              <button
                type="submit"
                className="bg-blue-500 text-white rounded p-2 mt-2"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

//   const chatWithAI = async (question: string) => {
//     const cloud = await loadData();
//     if (cloud) {

//     const parsedCloud = JSON.parse(cloud);
//     const content = parsedCloud.content;
//     console.log("cloud", content);
//     console.log('input',input)
//     const response = await fetch("/api/chat", {
//         method: "POST",
//         body: JSON.stringify({ content, input }),
//       });
// }

//   };
