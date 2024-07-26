"use client";

import React, { useEffect, useState } from "react";
import PreviewForm from "../forms/previews/PreviewForm";
import FormBuilder from "../forms/builders/FormBuilder";
import useDesigner from "@/hooks/useDesigner";
import FormLinkShare from "../ui/FormLinkShare";
import FormCodeGenerator from "../forms/codeGenerator/FormCodeGenerator";
import InsertElement from "../forms/InsertElement";

export default function Designer({ form }: { form: Form }) {
  const [preview, setPreview] = useState(false);
  const { setElements, elements } = useDesigner();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isReady) return;

    const elements = form.content;
    setElements(elements);

    const readyTimeout = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(readyTimeout);
  }, [form, setElements, isReady]);

  const handleSave = async () => {
    try {
      const response = await fetch("/api/forms/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: form.id,
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
  };

  if (!isReady) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <p className="animate-spin h-12 w-12">____ |___|</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center gap-2  w-full">
        <div className="flex justify-center py-4 gap-[23%]">
          <div className="flex flex-row   gap-2">
            <button
              className={`btn_header
                 ${
                   !preview
                     ? "bg-zinc-100 text-zinc-800"
                     : "bg-white"
                 }
                `}
              onClick={() => {
                setPreview(true);
              }}
            >
              Preview
            </button>
            <button
              className={`btn_header
                 ${
                   preview
                     ? "bg-zinc-100 text-zinc-800"
                     : "bg-white"
                 }
                `}
              onClick={() => {
                setPreview(false);
              }}
            >
              Edit
            </button>
          </div>
          <div className="flex flex-row   gap-2">
            <button
              className="border-[0.5px] bg-zinc-100 border-[#b3b3b4] text-[13px] font-semibold hover:bg-[#d7d7d8] rounded-[12px]  p-2"
              onClick={handleSave}
            >
              Save Changes
            </button>
            <FormCodeGenerator />
          </div>
        </div>
        {/* <FormLinkShare shareUrl={'deidine'}/> */}
        <div className="mx-auto w-full flex flex-col items-center justify-center">
          {preview ? <PreviewForm /> : <FormBuilder />}
        <InsertElement/>
        </div>
      </div>
    </>
  );
}
