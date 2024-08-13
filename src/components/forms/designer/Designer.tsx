"use client";
import React, { useEffect, useRef, useState } from "react";
import PreviewForm from "../previews/PreviewForm";
import FormBuilder from "../builders/FormBuilder"; 
import InsertElement from "../InsertElement";
import SideButtons from "./SideButtons"; 
import FormCodeGenerator from "../codeGenerator/FormCodeGenerator";
import StyleForm from "../styleForm/styleForm";
import TopButton from "./TopButton";
export default function Designer({
  form,
  isFromLocalStorage,
}: {
  form: Form;
  isFromLocalStorage: boolean;
}) {

  const [selectedButton, setSelectedButton] = useState<
  "preview" | "field" | "design" | "Export code"
>("field");
const childRef = useRef<any>();

  return (
    <>
      <div className="flex relative  flex-col justify-center gap-2  w-full">
        <SideButtons
          selected={function (
            current: "preview" | "field" | "design" | "Export code"
          ): void {
            setSelectedButton(current);
          }}
        />
        <TopButton
          onCopyClick={(value:string) => {
         
            if (childRef.current) {
              childRef.current.copyToClipboard();
            }
          }}
          onDownloadClick={() => {
            if (childRef.current) {
              childRef.current.downloadCode();
            }
          }}
        selectedButton2={selectedButton}  form={form} isFromLocalStorage={isFromLocalStorage}/>

        <div className="mx-auto  w-full flex flex-col items-center pt-[50px]  justify-center">
          {selectedButton === "preview" && <PreviewForm />}

          {selectedButton === "field" && (
            <>
              {" "}
              <FormBuilder /> <InsertElement />
            </>
          )}
          {selectedButton === "design" && <StyleForm />}
          {selectedButton === "Export code" && (
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
