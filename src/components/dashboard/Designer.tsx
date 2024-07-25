"use client";

import React, { useEffect, useState } from "react";
import PreviewForm from "../forms/previews/PreviewForm";
import FormBuilder from "../forms/builders/FormBuilder";
import useDesigner from "@/hooks/useDesigner";
import FormLinkShare from "../ui/FormLinkShare"; 
import FormCodeGenerator from "../forms/codeGenerator/FormCodeGenerator";
 
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
      const response = await fetch('/api/forms/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: form.id, 
          content: elements, 
        }),
      });

      if (!response.ok) {
        throw new Error('Error inserting data');
      }

      const data = await response.json();
      console.log('Data inserted:', data);
    } catch (error) {
      console.error('Error:', error);
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
      <div className="flex w-full flex-col items-center justify-center relative overflow-y-auto bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
        <div className="inline-flex gap-x-3 mt-4 p-1 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 rounded-lg text-sm bg-zinc-50 justify-center items-center outline border w-1/2 h-20">
          <button
            onClick={() => {
              setPreview(true);
            }}
            className={`btn2 border border-zinc-200 hover:bg-zinc-900/90 hover:text-white h-9 px-3 rounded-lg text-zinc-800 ${
              !preview ? "bg-zinc-100 text-zinc-800" : "bg-white text-black font-semibold"
            }`}
          >
            Preview
          </button>
          <button
            className={`btn2 hover:bg-zinc-900/90 h-9 px-3 rounded-lg border hover:text-white ${
              preview ? "bg-zinc-100 text-zinc-800" : "bg-white text-black font-semibold"
            }`}
            onClick={() => {
              setPreview(false);
            }}
          >
            Edit
          </button>
          <button
          className={`btn2 hover:bg-zinc-900/90 h-9 px-3 rounded-lg border hover:text-white ${
            preview ? "bg-zinc-100 text-zinc-800" : "bg-white text-black font-semibold"
          }`}
          onClick={handleSave}>Save Changes</button>
          <FormCodeGenerator />
        </div>
        {/* <FormLinkShare shareUrl={'deidine'}/> */}

        {preview ? <PreviewForm /> : <FormBuilder />}
      </div>
    </>
  );
}
