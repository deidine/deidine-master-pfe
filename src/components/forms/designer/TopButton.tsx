"use client";
import React, { useEffect, useRef, useState } from "react";
import FormLinkShare from "../../publishedForm/FormLinkShare";
import { CiCircleInfo, CiCircleCheck } from "react-icons/ci";
import { Badge, Button, Select, Tooltip } from "antd";
import { FaSave, FaUndo, FaRedo } from "react-icons/fa";
import useDesigner from "@/hooks/useDesigner";
import { useHotkeys } from "react-hotkeys-hook";
import { lnaguageGenerator } from "@/data/data";
import useStyle from "@/hooks/useStyle";

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
  const {
    elements,
    codeForLanguage,
    setCodeForLanguage,
    setElements,
    undo,
    redo,
    undoStack,
    redoStack,
  } = useDesigner();
  const [isReady, setIsReady] = useState(false);
  const isFirstRender = useRef(true);
  const [isSavedField, setIsSavedField] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { formStyle, buttonStyle, elementStyle } = useStyle();
  const [isSavedDesign, setIsSavedDesign] = useState(true);
  const [isLoadingStyle, setIsLoadingStyle] = useState(false);

  const handleSave = async (isStyle: boolean) => {
    if (isStyle) {
      setIsLoadingStyle(true);
    } else {
      setIsLoading(true);
    }
    if (isFromLocalStorage) {
      try {
        const forms = JSON.parse(localStorage.getItem("forms") || "[]");
        const idForm = form.id;
        const formIndex = forms.findIndex((form: any) => form.id === idForm);

        if (formIndex !== -1) {
          forms[formIndex].content = elements;
          if (isStyle) {
            forms[formIndex].style = formStyle;
            forms[formIndex].buttonStyle = buttonStyle;
            forms[formIndex].elementStyle = elementStyle;
          }
        } else {
          forms.push({
            idForm,
            content: elements,
            style: formStyle,
            elementStyle: elementStyle,
            buttonStyle: buttonStyle,
          });
        }

        localStorage.setItem("forms", JSON.stringify(forms));
        console.log("Data saved to localStorage");
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    } else if (!isFromLocalStorage) {
      try {
        let body = {};
        if (isStyle) {
          body = {
            ...form,
            content: elements,
            style: formStyle,
            elementStyle: elementStyle,
            buttonStyle: buttonStyle,
          };
        } else {
          body = { ...form, content: elements };
        }
        const response = await fetch("/api/forms/", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
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
    if (isStyle) {
      setIsSavedDesign(true);
      setIsLoadingStyle(false);
    } else {
      setIsSavedField(true);
      setIsLoading(false);
    }
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
    setIsSavedField(false); // For the "field" tab
  }, [elements]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setIsSavedDesign(false); // For the "design" tab
  }, [formStyle, buttonStyle, elementStyle]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSavedField) {
        handleSave(false); // Save fields
      }
      if (!isSavedDesign) {
        handleSave(true); // Save design styles
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [isSavedField, isSavedDesign, handleSave]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isSavedField || !isSavedDesign) {
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
  }, [isSavedField, isSavedDesign]);

  useHotkeys("ctrl+z, meta+z", undo, { preventDefault: true });
  useHotkeys("ctrl+y, meta+y", redo, { preventDefault: true });
  useHotkeys("ctrl+s, meta+s", () => handleSave(false), { preventDefault: true });

  const handleTypeChange = (value: string) => {
    setCodeForLanguage(value);
  };

  return (
    <div>
      <div className="bg-white z-10 shadow-[inset_0_-1px_0_0_#eaeaea] fixed flex justify-between px-[80px] h-[60px] border-b-1 items-center border-black w-full">
        <div className="flex items-center text-lg pl-[100px] font-semibold">
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
                className="border-[0.5px] bg-zinc-100 border-[#b3b3b4] text-[13px] font-semibold hover:bg-[#d7d7d8] rounded-[12px] p-2"
                onClick={undo}
                disabled={undoStack.length === 0}
              >
                <FaUndo />
              </Button>
            </Tooltip>
            <Tooltip title="ctrl+y">
              <Button
                className="border-[0.5px] bg-zinc-100 border-[#b3b3b4] text-[13px] font-semibold hover:bg-[#d7d7d8] rounded-[12px] p-2"
                onClick={redo}
                disabled={redoStack.length === 0}
              >
                <FaRedo />
              </Button>
            </Tooltip>

            <Badge dot={!isSavedField} style={{ width: "15px", height: "15px" }}>
              <Tooltip title="ctrl+s">
                <Button
                  icon={<FaSave />}
                  loading={isLoading}
                  className="border-[0.5px] bg-zinc-100 border-[#b3b3b4] text-[13px] font-semibold hover:bg-[#d7d7d8] rounded-[12px] p-2"
                  onClick={() => handleSave(false)}
                  disabled={isSavedField}
                >
                  Save Field Changes
                </Button>
              </Tooltip>
            </Badge>
          </div>
        )}
        {selectedButton2 === "preview" && !form.isFromLocalStorage && (
          <div className="flex space-x-5 px-4 py-4">
            <Tooltip title="Export Code">
              <Button
                className="border-[0.5px] bg-zinc-100 border-[#b3b3b4] text-[13px] font-semibold hover:bg-[#d7d7d8] rounded-[12px] p-2"
                onClick={() => onCopyClick("export")}
              >
                Export Code
              </Button>
            </Tooltip>
            <Tooltip title="Download Code">
              <Button
                className="border-[0.5px] bg-zinc-100 border-[#b3b3b4] text-[13px] font-semibold hover:bg-[#d7d7d8] rounded-[12px] p-2"
                onClick={() => onDownloadClick("download")}
              >
                Download Code
              </Button>
            </Tooltip>
          </div>
        )}
        {selectedButton2 === "design" && (
          <div className="flex space-x-5 px-4 py-4">
            <Tooltip title="Save Design Changes">
              <Badge dot={!isSavedDesign} style={{ width: "15px", height: "15px" }}>
                <Button
                  icon={<FaSave />}
                  loading={isLoadingStyle}
                  className="border-[0.5px] bg-zinc-100 border-[#b3b3b4] text-[13px] font-semibold hover:bg-[#d7d7d8] rounded-[12px] p-2"
                  onClick={() => handleSave(true)}
                  disabled={isSavedDesign}
                >
                  Save Design Changes
                </Button>
              </Badge>
            </Tooltip>
          </div>
        )}
        {selectedButton2 === "Export code" && (
          <div className="flex space-x-5 px-4 py-4">
            <Select
              defaultValue="json"
              style={{ width: 120 }}
              onChange={handleTypeChange}
              options={lnaguageGenerator}
            />
          </div>
        )}
      </div>
    </div>
  );
}
