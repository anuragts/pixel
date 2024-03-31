"use client";
import React from "react";
import { Button } from "./button";
import { publishNote } from "@/app/actions";
import { useRouter } from "next/navigation";

type PublishNoteProps = {
    id: number;
  }

  export default function PublishNote({ id }: PublishNoteProps) {
    const router = useRouter();
  async function handleClick() {
    const res = await publishNote(id);
    router.push(`/published/${id}`);
  }

  return (
    <div className="mx-2">
      <Button onClick={handleClick}>Publish Note</Button>
    </div>
  );
}
