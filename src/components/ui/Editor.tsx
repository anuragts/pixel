"use client";
import { useEffect, useState } from "react";
import { Editor as NovelEditor } from "novel";
import { getNoteById, updateNote } from "@/app/actions";
import { type JSONContent } from "@tiptap/core";
import Warning from "@/components/ui/Warning";

type Note = {
  content: string;
  id: number;
  title: string;
  userId: number;
};
export default function Editor({ id }: { id: number }) {
  const [data, setData] = useState<JSONContent | string>("");
  const [note, setNote] = useState<Note | null>(null);
  const [cloudData, setCloudData] = useState<JSONContent | string>("");
  const [syncWithCloudWarning, setSyncWithCloudWarning] = useState(false);
  const [saveStatus, setSaveStatus] = useState("Saved");

  const loadData = async () => {
    try {
      const response = await getNoteById(id);

      return response;
    } catch (error) {
      console.error("Error loading data from cloud:", error);
      return null;
    }
  };

  useEffect(() => {
    const synchronizeData = async () => {
      const cloud = await loadData();
      if (cloud) {
        const parsedCloud = JSON.parse(cloud);
        const contentCloud = parsedCloud.content;
        setCloudData(contentCloud as JSONContent[]);
        console.log("cloud", parsedCloud);

        const local = localStorage.getItem(`${id}`);
        if (local) {
          setData(local);
          if (local !== JSON.stringify(cloud)) {
            setSyncWithCloudWarning(true);
          }
        } else {
          const parsedCloud = JSON.parse(cloud);
          const contentCloud = parsedCloud.content;
          setData(contentCloud);
          localStorage.setItem(`${id}`, JSON.stringify(contentCloud));
        }
      }
    };

    void synchronizeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const handleKeepLocalStorage = () => {
    setSyncWithCloudWarning(false);
  };

  const handleKeepCloudStorage = () => {
    localStorage.setItem(`${id}`, JSON.stringify(cloudData));
    setData(cloudData);
    setSyncWithCloudWarning(false);
  };

  return (
    <>
      {syncWithCloudWarning && (
        <Warning
          handleKeepLocalStorage={handleKeepLocalStorage}
          handleKeepCloudStorage={handleKeepCloudStorage}
        />
      )}

      <div className="relative w-full max-w-screen-lg pb-8">
        <div className="absolute right-5 top-5 mb-5 rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400">
          {saveStatus}
        </div>
        <NovelEditor
          key={JSON.stringify(data)}
          defaultValue={data}
          storageKey={`${id}`}
          completionApi="/api/generate"
          className="text-gray-100 bg-black h-[100vh]"
          onUpdate={(_) => {
            setSaveStatus("Unsaved");
          }}
          onDebouncedUpdate={async (value) => {
            if (!value) return;
            setSaveStatus("Saving...");

            try {
              // Extract necessary data from value here
              const content = value?.getJSON();

              const response = await updateNote({
                id,
                content: JSON.stringify(content),
              });
              setSaveStatus("Saved");
            } catch (error) {
              console.error("Error saving data:", error);
              setSaveStatus("Failed to save");
            }
          }}
        />
      </div>
    </>
  );
}
