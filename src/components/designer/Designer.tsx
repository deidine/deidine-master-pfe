"use client";

import React, { useEffect, useState } from "react";
import PreviewForm from "../forms/previews/PreviewForm";
import FormBuilder from "../forms/builders/FormBuilder";
import useDesigner from "@/hooks/useDesigner";  
import InsertElement from "../forms/InsertElement";
import TopButtons from "./TopButtons"; 

export default function Designer({ form ,isFromLocalStorage}: { form: Form,isFromLocalStorage:boolean }) {
  const [preview, setPreview] = useState(false);
  const { setElements } = useDesigner();
  const [isReady, setIsReady] = useState(false);
 
  useEffect(() => {
    if (isReady) return; 
    setElements(form.content); 
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
      <div className="flex flex-col justify-center gap-2  w-full">
     <TopButtons id={form.id} onPreview={(value: boolean) => setPreview(value)} isFromLocalStorage={isFromLocalStorage}/>
        {/* <FormLinkShare shareUrl={'deidine'}/> */}
        <div className="mx-auto w-full flex flex-col items-center justify-center">
          {preview ? <PreviewForm /> : <FormBuilder />}
        <InsertElement/>
        </div>
      </div>
    </>
  );
}
