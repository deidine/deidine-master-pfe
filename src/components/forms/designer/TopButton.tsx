"use client";
import React, { useEffect, useRef, useState } from "react";
import FormLinkShare from "../../publishedForm/FormLinkShare";
import { CiCircleInfo, CiCircleCheck } from "react-icons/ci";
import { Badge, Button, Select, Tooltip } from "antd";
import { FaSave, FaUndo, FaRedo } from "react-icons/fa";
import useDesigner from "@/hooks/useDesigner";
import { useHotkeys } from "react-hotkeys-hook";
import { lnaguageGenerator } from "@/data/data";

export default function TopButton({
  form,
  isFromLocalStorage,
  selectedButton2,
  onCopyClick,
  onDownloadClick,
}: {
  form: Form;
  isFromLocalStorage: boolean;
  selectedButton2: "preview" | "field" | "design" | "Export code";
  onCopyClick: (value: string) => void;
  onDownloadClick: (value: string) => void;
}) {
  const shareUrl = window.location.href.replace("forms", "published");
  const {elements,codeForLanguage, setCodeForLanguage , setElements, undo, redo, undoStack, redoStack } = useDesigner();
  const [isReady, setIsReady] = useState(false);
  const isFirstRender = useRef(true);
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

  useHotkeys("ctrl+z, meta+z", undo, { preventDefault: true });
  useHotkeys("ctrl+y, meta+y", redo, { preventDefault: true });
  useHotkeys("ctrl+s, meta+s", handleSave, { preventDefault: true });

  if (!isReady) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <p className="animate-spin h-12 w-12">____ |___|</p>
      </div>
    );
  }
  const handleTypeChange = (value: string) => {
    setCodeForLanguage(value);
    
  };

  return (
    <div>
      <div className="bg-white z-10 shadow-[inset_0_-1px_0_0_#eaeaea] fixed  flex justify-between px-[80px]  h-[60px] border-b-1   items-center border-black w-full  ">
        <div className="flex items-center  text-lg pl-[100px] font-semibold">
          <div className="pr-2">
            {form.isFromLocalStorage ? (
              <CiCircleInfo className="text-red-500" />
            ) : (
              <CiCircleCheck className="text-green-500" />
            )}
          </div>
          {form.title}
          <div className="w-[10px] h-[10px] rounded-full mx-[9px] bg-[#36b3fa] inline-flex"></div>
          <div className="pr-4">{selectedButton2}</div>

          {elements.length > 0 ? (
            <Badge
              style={{ backgroundColor: "#36b3fa" }}
              count={elements.length + " Element(s)"}
            ></Badge>
          ) : (
            <Badge
              style={{ backgroundColor: "#A6b3fa" }}
              count={"0 Element"}
            ></Badge>
          )}
        </div>
        {selectedButton2 === "field" && (
          <div className="flex justify-between space-x-5 px-4 py-4">
            <Tooltip title="ctrl+z">
              <Button
                className="border-[0.5px] bg-zinc-100 border-[#b3b3b4]   text-[13px] font-semibold hover:bg-[#d7d7d8] rounded-[12px] p-2"
                onClick={undo}
                disabled={undoStack.length === 0}
              >
                <FaUndo />
              </Button>
            </Tooltip>
            <Tooltip title="ctrl+y">
              <Button
                className="border-[0.5px] bg-zinc-100 border-[#b3b3b4]   text-[13px] font-semibold hover:bg-[#d7d7d8] rounded-[12px] p-2"
                onClick={redo}
                disabled={redoStack.length === 0}
              >
                <FaRedo />
              </Button>
            </Tooltip>

            <Badge dot={!isSaved} style={{ width: "15px", height: "15px" }}>
              <Tooltip title="ctrl+s">
                <Button
                  icon={<FaSave />}
                  loading={isLoading}
                  className="border-[0.5px] bg-zinc-100 border-[#b3b3b4]   text-[13px] font-semibold hover:bg-[#d7d7d8] rounded-[12px] p-2"
                  onClick={handleSave}
                  disabled={isSaved}
                >
                  Save Changes
                </Button>
              </Tooltip>
            </Badge>
          </div>
        )}
        {selectedButton2 === "preview" && (
          <div className="flex justify-between space-x-5 px-4 py-4">
            <FormLinkShare shareUrl={shareUrl} />
          </div>
        )}
        {selectedButton2 === "Export code" && (
          <>
            {" "}
            <div className="flex justify-between space-x-5 px-4 py-4">
              <Button
                key="copy"
                className="border-[0.5px] bg-zinc-100 border-[#b3b3b4]   text-[13px] font-semibold hover:bg-[#d7d7d8] rounded-[12px] p-2"
                onClick={() => {
                  onCopyClick("copy");
                }}
              >
                Copy
              </Button>
              <Button
                className="border-[0.5px] bg-zinc-100 border-[#b3b3b4]   text-[13px] font-semibold hover:bg-[#d7d7d8] rounded-[12px] p-2"
                key="download"
                onClick={() => {
                  onDownloadClick("download");
                }}
              >
                Download
              </Button>
             <div>
             <Select
            className="w-full"
            value={codeForLanguage}
            onChange={handleTypeChange}
            placeholder="Select input type"
          > 
             {lnaguageGenerator.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    <div className="flex gap-2 text-lg items-center">
                      <option.icon /> {option.label}
                    </div>
                  </Select.Option>
                ))
           }
          </Select>
             </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
