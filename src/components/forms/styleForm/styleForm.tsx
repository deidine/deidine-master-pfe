"use client";
import React, { useState } from "react";
import PreviewStyleForm from "../previews/PreviewStyleForm";
import StylingButton from "./allStylePattern/stylingButton";
import StylingElements from "./allStylePattern/stylingElements";
import StylingForm from "./allStylePattern/stylingForm";
import StylingParagraph from "./allStylePattern/stylingParagraph";
import StylingLogotitle from "./allStylePattern/stylingLogotitle";
import useDesigner from "@/hooks/useDesigner";

export default function StyleForm() {
  const [currentSelected, setCurrentSelected] = useState<
    "Form" | "Elements" | "Buttons" | "Paragraph" | "Logo"
  >();

  const handelClcik = (
    value: "Form" | "Elements" | "Buttons" | "Paragraph" | "Logo"
  ) => {
    setCurrentSelected(value);
  };
  const { elements } = useDesigner();
  const logoElement = elements.find(
    (element) => element.elementType.type === "logo"
  );
  return (
    <div className="flex relative justify-center py-20 items-center  w-full h-full ">
     <PreviewStyleForm /> 
        <div
          className="top-[40px] pt-[100px] fixed px-4  flex flex-col justify-start  right-0 w-[20%] h-[calc(100vh-40px)] overflow-auto bg-white"
        >
          <div className="border-b-[1px]  border-gray-200 pt-[12px]">
            <StylingForm
              currentSelected={currentSelected}
              trriger={handelClcik}
              currentStyling="Form"
            />
          </div>{" "}
          <div className="border-b-[1px]  border-gray-200  pt-[12px]">
            <StylingElements
              currentSelected={currentSelected}
              trriger={handelClcik}
              currentStyling="Elements"
            />{" "}
          </div>{" "}
          <div className="border-b-[1px]  border-gray-200  pt-[12px]">
            <StylingButton
              currentSelected={currentSelected}
              trriger={handelClcik}
              currentStyling="Buttons"
            />{" "}
          </div>{" "}
          <div className="border-b-[1px]  border-gray-200  pt-[12px]">
            <StylingParagraph
              currentSelected={currentSelected}
              trriger={handelClcik}
              currentStyling="Paragraph"
            />{" "}
          </div>
          {logoElement && (
            <div className="border-b-[1px]  border-gray-200  pt-[12px]">
              <StylingLogotitle
                currentSelected={currentSelected}
                trriger={handelClcik}
                currentStyling="Logo"
                element={logoElement}
              />{" "}
            </div>
          )} 
      </div>  
    </div>
  );
}
