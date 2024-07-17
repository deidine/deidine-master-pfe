"use client";
import React, { useEffect, useState } from "react";
import PreviewForm from "../forms/previews/PreviewForm";
import FormBuilder from "../forms/builders/FormBuilder";
import useDesigner from "@/hooks/useDesigner";
import FormLinkShare from "../ui/FormLinkShare";
import FormCodeGenerator from "../forms/codeGenerator/FormCodeGenerator";

export default function Designer({ form }: { form: Form }) {
  const [preview, setPreview] = useState(false);
  const { setElements } = useDesigner();
  const [isReady, setIsReady] = useState(false);

 useEffect(() => {
    if (isReady) return;

    const elements = form.content;
    setElements(elements);

    const readyTimeout = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(readyTimeout);
  }, [form, setElements, isReady]);

  if (!isReady) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <p className="animate-spin h-12 w-12">____ |___|</p>
      </div>
    );
  }
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center relative overflow-y-auto  bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
        <div
          className=" inline-flex gap-x-3 mt-4 p-1 text-zinc-500 dark:bg-zinc-800
         dark:text-zinc-400 
        rounded-lg text-sm bg-zinc-50
         justify-center items-center   outline border w-1/2 h-20  "
        >
          <button
            onClick={() => {
              setPreview(true);
            }}
            className={`btn2 border border-zinc-200   hover:bg-zinc-900/90   hover:text-white   h-9 px-3 rounded-lg text-zinc-800  ${
              !preview
                ? "bg-zinc-100 text-zinc-800"
                : "bg-white text-black font-semibold"
            }`}
          >
            Preview
          </button>
          <button
            className={`btn2 hover:bg-zinc-900/90 h-9 px-3 rounded-lg border    hover:text-white ${
              preview
                ? "bg-zinc-100 text-zinc-800"
                : "bg-white text-black font-semibold"
            }`}
            onClick={() => {
              setPreview(false);
            }}
          >
            Edit
          </button>
          <FormCodeGenerator />
        </div>
        {/* <FormLinkShare shareUrl={'deidine'}/> */}

        {preview ? <PreviewForm /> : <FormBuilder />}
      </div>
    </>
  );
}

  function TopBar() {
  return (
    <div className="py-3 border-b max-w-2xl mx-auto mt-3 border shadow-sm rounded-xl">
      <div dir="ltr" data-orientation="horizontal" className="w-60 mx-auto">
        <div className="inline-flex gap-x-3 h-10 items-center justify-center p-1 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 w-full rounded-lg text-sm bg-zinc-50">
          <button className="btn2 border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 h-9 px-3 rounded-lg text-zinc-800 w-14">
            Save
          </button>
          <button className=" btn2  hover:bg-zinc-900/90  h-9 px-3 rounded-lg border bg-zinc-100 text-zinc-800 hover:text-white">
            Publish
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium  w-full rounded-lg gap-x-2  "
          >
            Preview
          </button>
        </div>
      </div>
    </div>
  );
}