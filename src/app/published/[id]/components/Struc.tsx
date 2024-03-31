"use client";

import { useEffect, useState } from "react";
import { getNoteById } from "@/app/actions";

type StrucProps = {
  id: number;
}

export default function Struc({ id }: StrucProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState<string>(" ");
  const [content, setContent] = useState<string>(" ");

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
        setTitle(parsedCloud.title);
        setContent(parsedCloud.content);
      }
    };

    void getData();
  }, [id]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="p-8  shadow-lg rounded-lg mx-[5vw] md:mx-[20vw]">
      <h2 className="text-2xl text-center font-semibold mb-4">{title}</h2>
      <p className="">{content}</p>
    </div>
  );
}