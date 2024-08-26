"use client";
import React, { useEffect, useRef, useState } from "react";
import PreviewForm from "../previews/PreviewForm";
import FormBuilder from "../builders/FormBuilder";
import InsertElement from "../InsertElement";
import SideButtons from "./SideButtons";
import FormCodeGenerator from "../codeGenerator/FormCodeGenerator";
import StyleForm from "../styleForm/styleForm";
import TopButton from "./TopButton";
import useStyle from "@/hooks/useStyle";

export default function Designer({
  form,
  isFromLocalStorage,
}: {
  form: Form;
  isFromLocalStorage: boolean;
}) {
  const { setButtonStyle, setElementStyle, setFormStyle,setParagraphStyle } = useStyle();
  const [selectedButton, setSelectedButton] = useState<
    "Champ"|
  "Aperçu"|
  "Concevoir"|
  "Code"
  >("Champ");
  const childRef = useRef<any>();
// it set the design fro the element and stlye it 
  useEffect(() => {
    setElementStyle(form.elementStyle!);
    setFormStyle(form.style!);
    setButtonStyle(form.buttonStyle!);
    setParagraphStyle(form.paragraphStyle!);
  }, []);

  return (
    <>
      <div className="flex relative  font-title flex-col justify-center gap-2 w-full">
        <TopButton
          onCopyClick={(value: string) => {
            if (childRef.current) {
              childRef.current.copyToClipboard();
            }
          }}
          onDownloadClick={() => {
            if (childRef.current) {
              childRef.current.downloadCode();
            }
          }}
          selectedButton2={selectedButton}
          form={form}
          isFromLocalStorage={isFromLocalStorage}
        />
        <SideButtons
          selected={(current: "Champ"|
  "Aperçu"|
  "Concevoir"|
  "Code") => {
            setSelectedButton(current);
          }}
        />
        <div className="mx-auto w-full flex flex-col items-center pt-[50px] justify-center">
          {selectedButton === "Aperçu" && <PreviewForm showSubmit={true} />}
          {selectedButton === "Champ" && (
            <>
              <FormBuilder />
              <InsertElement />
            </>
          )}
          {selectedButton === "Concevoir" && <StyleForm />}
          {selectedButton === "Code" && (
            <FormCodeGenerator
              ref={childRef}
              onCopyComplete={(componentCode: string) => {}}
              onDownloadComplete={(componentCode: string) => {}}
            />
          )}
        </div>
      </div>
    </>
  );
}
