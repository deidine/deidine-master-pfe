"use client";
import useDesigner from '@/hooks/useDesigner';
import React, { useEffect, useState, useRef } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import FormCodeGenerator from "../forms/codeGenerator/FormCodeGenerator";
import { openNotification } from '@/utils/utils';
import { Button } from 'antd';

export default function TopButtons({ id, isFromLocalStorage, onPreview }: { id: number, isFromLocalStorage: boolean, onPreview: (value: boolean) => void }) {
  const [preview, setPreview] = useState(false);
  const [isSaved, setIsSaved] = useState(true);
  const [isLoading, setIsLoading] = useState(false);   
  const { elements } = useDesigner();
  const isFirstRender = useRef(true); // Track the first render

  const handleSave = async () => {
    setIsLoading(true);

    if (isFromLocalStorage && !isSaved) {
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
        openNotification("topRight", 'success', "Data saved to localStorage", "Data saved to localStorage successfully");
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    } else if (!isFromLocalStorage && !isSaved) {
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
        !isLoading && openNotification("topRight", 'success', "Data inserted", "Data inserted successfully in database");
      } catch (error) {
        console.error("Error:", error);
      }
    }
    setIsSaved(true);   
    setIsLoading(false);
  };

  useHotkeys("ctrl+s, meta+s", handleSave, { preventDefault: true });

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Set to false after the first render
      return;
    }
    setIsSaved(false); // Set isSaved to false whenever elements change after the first render
  }, [elements]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSaved) {
        handleSave();
      }
    }, 60000); // 60000 milliseconds = 1 minute

    return () => clearInterval(interval);
  }, [isSaved ]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isSaved) {
        const message = "You have unsaved changes. Are you sure you want to leave?";
        event.preventDefault();
        event.returnValue = message;
        return message;
      }
    };
 

    window.addEventListener("beforeunload", handleBeforeUnload);
 
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload); 
    };
  }, [isSaved]);

  return (
    <div className="flex justify-center py-4 gap-[23%]">
      <div className="flex flex-row gap-2">
        <Button
          className={`btn_header ${!preview ? "bg-zinc-100 text-zinc-800" : "bg-white"}`}
          onClick={() => {
            onPreview(true);
            setPreview(true);
          }}
        >
          Preview
        </Button>
        <Button
          className={`btn_header ${preview ? "bg-zinc-100 text-zinc-800" : "bg-white"}`}
          onClick={() => {
            onPreview(false);
            setPreview(false);
          }}
        >
          Edit
        </Button>
      </div>
      <div className="flex flex-row gap-2">
        <Button
        loading={isLoading}
          className="border-[0.5px] bg-zinc-100 border-[#b3b3b4] text-[13px] font-semibold hover:bg-[#d7d7d8] rounded-[12px] p-2"
          onClick={handleSave}
        >
          Save Changes
        </Button>
        <FormCodeGenerator />
      </div>
    </div>
  );
}
