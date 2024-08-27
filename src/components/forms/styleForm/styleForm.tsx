"use client";
import React, { useState } from "react";
import PreviewStyleForm from "../previews/PreviewStyleForm";
import StylingButton from "./allStylePattern/stylingButton";
import StylingElements from "./allStylePattern/stylingElements";
import StylingForm from "./allStylePattern/stylingForm";
import StylingParagraph from "./allStylePattern/stylingParagraph";
import StylingLogotitle from "./allStylePattern/stylingLogotitle";

export default function StyleForm() {
  const [currentSelected, setCurrentSelected] = useState<
    "Form" | "Elements" | "Buttons" | "Paragraph" | "LogoTitle"
  >();

  const handelClcik = (
    value: "Form" | "Elements" | "Buttons" | "Paragraph" | "LogoTitle"
  ) => {
    setCurrentSelected(value);
  };

  return (
    <div className="flex relative justify-center py-20 items-center  w-full h-full ">
      <PreviewStyleForm />

      <div
        className="top-[118px] pt-[100px] fixed px-4  flex flex-col justify-start  
     right-0 w-[20%] h-[calc(100vh-118px)] overflow-auto bg-white"
      > 
     
     
          <div className="border-b-[1px]  border-gray-200 pt-[12px]">
          <StylingForm
            currentSelected={currentSelected}
            trriger={handelClcik}
            currentStyling="Form"
          /> 
                </div>     <div className="border-b-[1px]  border-gray-200  pt-[12px]">
          <StylingElements
            currentSelected={currentSelected}
            trriger={handelClcik}
            currentStyling="Elements"
          />      </div>     <div className="border-b-[1px]  border-gray-200  pt-[12px]">
          <StylingButton
            currentSelected={currentSelected}
            trriger={handelClcik}
            currentStyling="Buttons"
          />      </div>     <div className="border-b-[1px]  border-gray-200  pt-[12px]">
          <StylingParagraph
            currentSelected={currentSelected}
            trriger={handelClcik}
            currentStyling="Paragraph"
          />      </div>     <div className="border-b-[1px]  border-gray-200  pt-[12px]">
          {" "}
          <StylingLogotitle
            currentSelected={currentSelected}
            trriger={handelClcik}
            currentStyling="LogoTitle"
          />      </div>
      </div>
    </div>
  );
}
