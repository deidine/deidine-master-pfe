"use client";
import useDesigner from '@/hooks/useDesigner';
import React, { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import FormCodeGenerator from "../forms/codeGenerator/FormCodeGenerator";

export default function TopButtons({ id, isFromLocalStorage, onPreview }: { id: number, isFromLocalStorage: boolean, onPreview: (value: boolean) => void }) {
  const [preview, setPreview] = useState(false);
  const { elements } = useDesigner();

  const handleSave = async () => {
    if (isFromLocalStorage) {
      try {
        const forms = JSON.parse(localStorage.getItem("forms") || "[]");
        const formIndex = forms.findIndex((form: any) => form.id === id);

        if (formIndex !== -1) {
          forms[formIndex].content = elements;
        } else {
          forms.push({ id, content: elements });
        }

        localStorage.setItem("forms", JSON.stringify(forms));
        console.log("Data saved to localStorage");
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    } else {
      try {
        const response = await fetch("/api/forms/", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            content: elements,
          }),
        });

        if (!response.ok) {
          throw new Error("Error inserting data");
        }

        const data = await response.json();
        console.log("Data inserted:", data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  useHotkeys("ctrl+s, meta+s", handleSave, { preventDefault: true });

  useEffect(() => {
    const interval = setInterval(() => {
      handleSave();
    }, 60000); // 60000 milliseconds = 1 minute

    return () => clearInterval(interval);
  }, [elements]);

  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    const message = "You have unsaved changes. Are you sure you want to leave?";
    event.preventDefault();
    event.returnValue = message;
    return message;
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      const userConfirmed = confirm("You have unsaved changes. Do you want to save them before leaving?");
      if (userConfirmed) {
        handleSave();
      }
    }
  };

  // useEffect(() => {
  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   document.addEventListener("visibilitychange", handleVisibilityChange);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //   };
  // }, [elements]);

  return (
    <div className="flex justify-center py-4 gap-[23%]">
      <div className="flex flex-row gap-2">
        <button
          className={`btn_header ${!preview ? "bg-zinc-100 text-zinc-800" : "bg-white"}`}
          onClick={() => {
            onPreview(true);
            setPreview(true);
          }}
        >
          Preview
        </button>
        <button
          className={`btn_header ${preview ? "bg-zinc-100 text-zinc-800" : "bg-white"}`}
          onClick={() => {
            onPreview(false);
            setPreview(false);
          }}
        >
          Edit
        </button>
      </div>
      <div className="flex flex-row gap-2">
        <button
          className="border-[0.5px] bg-zinc-100 border-[#b3b3b4] text-[13px] font-semibold hover:bg-[#d7d7d8] rounded-[12px] p-2"
          onClick={handleSave}
        >
          Save Changes
        </button>
        <FormCodeGenerator />
      </div>
    </div>
  );
}
