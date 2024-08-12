"use client";

import React, { useEffect, useRef, useState } from "react";
import PreviewForm from "../forms/previews/PreviewForm";
import FormBuilder from "../forms/builders/FormBuilder";
import useDesigner from "@/hooks/useDesigner";
import InsertElement from "../forms/InsertElement";
import SideButtons from "./SideButtons";
import { Avatar, Badge, Button } from "antd";
import { useHotkeys } from "react-hotkeys-hook";
import { openNotification } from "@/utils/utils";
import FormDesign from "../forms/designs/FormDesign";
import FormCodeGenerator from "../forms/codeGenerator/FormCodeGenerator";

export default function Designer({
  form,
  isFromLocalStorage,
}: {
  form: Form;
  isFromLocalStorage: boolean;
}) {
  const { setElements } = useDesigner();
  const [isReady, setIsReady] = useState(false);
  const { elements } = useDesigner();
  const isFirstRender = useRef(true);
  const [selectedButton, setSelectedButton] = useState<
    "preview" | "field" | "design" | "codeGenerator"
  >("field");

  const [isSaved, setIsSaved] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const handleSave = async () => {
    setIsLoading(true);

    if (isFromLocalStorage) {
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
    } else if (!isFromLocalStorage) {
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
  useHotkeys("ctrl+e, meta+e", handleSave, { preventDefault: true });
  useHotkeys("ctrl+p, meta+p", handleSave, { preventDefault: true });

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setIsSaved(false);
  }, [elements]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSaved) {
        handleSave();
      }
    }, 60000);

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
      <div className="flex relative  flex-col justify-center gap-2  w-full">
        <SideButtons
          selected={function (
            current: "preview" | "field" | "design" | "codeGenerator"
          ): void {
            setSelectedButton(current);
          }}
        />
        <div>
          <div className="bg-white z-10 shadow-[inset_0_-1px_0_0_#eaeaea] fixed  flex justify-between px-[80px]  h-[60px] border-b-1   items-center border-black w-full  ">
            <div className="flex items-center  text-lg pl-[100px] font-semibold">
              {form.title}
              <div className="w-[10px] h-[10px] rounded-full mx-[9px] bg-[#36b3fa] inline-flex"></div>
              <div className="pr-4">{selectedButton}</div>

              {elements.length > 0 ? (
                <Badge
                  style={{ backgroundColor: "#36b3fa" }}
                  count={elements.length}
                ></Badge>
              ) : (
                <Badge
                  style={{ backgroundColor: "#A6b3fa" }}
                  count={"0 Element"}
                ></Badge>
              )}
            </div>
            <Badge dot={!isSaved} style={{ width: "15px", height: "15px" }}>
              <Button
                loading={isLoading}
                className="border-[0.5px] bg-zinc-100 border-[#b3b3b4]   text-[13px] font-semibold hover:bg-[#d7d7d8] rounded-[12px] p-2"
                onClick={handleSave}
                disabled={isSaved}
              >
                Save Changes
              </Button>
            </Badge>
          </div>
        </div>

        <div className="mx-auto  w-full flex flex-col items-center pt-[50px]  justify-center">
          {selectedButton === "preview" && <PreviewForm />}

          {selectedButton === "field" && (
            <>
              {" "}
              <FormBuilder /> <InsertElement />
            </>
          )}
          {selectedButton === "design" && <FormDesign />}
          {selectedButton === "codeGenerator" && <FormCodeGenerator />}
        </div>
      </div>
    </>
  );
}
