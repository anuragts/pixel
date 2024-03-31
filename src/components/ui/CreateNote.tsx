"use client";
import { Button } from "./button";
import { getUserbyEmail } from "@/app/actions";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { createNote } from "@/app/actions";
import { useRouter } from "next/navigation";

export default function CreateNote() {
  const [id, setId] = useState<number | null>(null);
  const [noteTitle, setNoteTitle] = useState<string>("");
  const supabase = createClient();
  const router = useRouter();

  async function fetchUserId() {
    const { data, error } = await supabase.auth.getUser();
    if (!error && data) {
      const email = data?.user?.email as string;
      const res = await getUserbyEmail(email);
      return res.id;
    }
  }

  async function handleClick() {
    // You can now access the note title through the noteTitle state variable
    console.log("Note Title: ", noteTitle);

    const res: any = await createNote({
      title: noteTitle,
      userId: id as number | undefined,
    });

    console.log(res);

    const redirectId = res[0].id;

    router.push(`/note/${redirectId}`);
  }

  useEffect(() => {
    async function fetchData() {
      const res = (await fetchUserId()) as number;
      setId(res);
      console.log(res);
    }
    fetchData();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoteTitle(event.target.value);
  };

  return (
    <div className="flex justify-center">
      <div>
        <Input
          type="text"
          placeholder="Note Title"
          value={noteTitle}
          onChange={handleInputChange}
        />
        <div className="flex justify-center my-5">
        <Button onClick={handleClick}>New Note</Button>
        </div>
      </div>
    </div>
  );
}
