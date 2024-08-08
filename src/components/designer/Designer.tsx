"use client";

import React, { useEffect, useRef, useState } from "react";
import PreviewForm from "../forms/previews/PreviewForm";
import FormBuilder from "../forms/builders/FormBuilder";
import useDesigner from "@/hooks/useDesigner";
import InsertElement from "../forms/InsertElement";
import SideButtons from "./SideButtons";
import { Button } from "antd";
import { useHotkeys } from "react-hotkeys-hook";
import { openNotification } from "@/utils/utils";

export default function Designer({
  form,
  isFromLocalStorage,
}: {
  form: Form;
  isFromLocalStorage: boolean;
}) {
  const [preview, setPreview] = useState(false);
  const { setElements } = useDesigner();
  const [isReady, setIsReady] = useState(false);
  const { elements } = useDesigner();
  const isFirstRender = useRef(true);

  const [isSaved, setIsSaved] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const handleSave = async () => {
    setIsLoading(true);

    if (isFromLocalStorage && !isSaved) {
      try {
        const forms = JSON.parse(localStorage.getItem("forms") || "[]");
        const idForm = form.id;
        const formIndex = forms.findIndex((form: any) => form.id === idForm);

        if (formIndex !== -1) {
          forms[formIndex].content = elements;
        } else {
          forms.push({ idForm, content: elements });
        }

        localStorage.setItem("forms", JSON.stringify(forms));
        console.log("Data saved to localStorage");
        openNotification(
          "topRight",
          "success",
          "Data saved to localStorage",
          "Data saved to localStorage successfully"
        );
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
            id: form.id,
            content: elements,
          }),
        });

        if (!response.ok) {
          throw new Error("Error inserting data");
        }

        const data = await response.json();
        console.log("Data inserted:", data);
        !isLoading &&
          openNotification(
            "topRight",
            "success",
            "Data inserted",
            "Data inserted successfully in database"
          );
      } catch (error) {
        console.error("Error:", error);
      }
    }
    setIsSaved(true);
    setIsLoading(false);
  };
  useEffect(() => {
    if (isReady) return;
    setElements(form.content);
    const readyTimeout = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(readyTimeout);
  }, [form, setElements, isReady]);

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
  }, [isSaved]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isSaved) {
        const message =
          "You have unsaved changes. Are you sure you want to leave?";
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
  if (!isReady) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <p className="animate-spin h-12 w-12">____ |___|</p>
      </div>
    );
  }

  return (
    <>  
      <div className="flex relative flex-col justify-center gap-2  w-full">
       <SideButtons onPreview={(value: boolean) => setPreview(value)} /> 
         <div>
       
          <div className="bg-white flex justify-end  h-[60px] border-b-1   items-center border-black w-full  ">
            <Button
              loading={isLoading}
              className="border-[0.5px] bg-zinc-100 border-[#b3b3b4]   text-[13px] font-semibold hover:bg-[#d7d7d8] rounded-[12px] p-2"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        </div>

        {/* <FormLinkShare shareUrl={'deidine'}/> */}
        <div className="mx-auto  w-full flex flex-col items-center justify-center">
          {preview ? <PreviewForm /> : <FormBuilder />}
         <div className="fixed bottom-0 right-0 shadow-lg  h-auto z-10 ">
         <InsertElement />
         </div>
        </div>
      </div>
    </>
  );
}
