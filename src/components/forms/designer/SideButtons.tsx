"use client";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDesignServices, MdOutlineCode, MdOutlinePreview } from "react-icons/md";
import StylingButton from "../styleForm/allStylePattern/stylingButton";
import StylingElements from "../styleForm/allStylePattern/stylingElements";
import StylingForm from "../styleForm/allStylePattern/stylingForm";

export default function SideButtons({
  selected,
}: {
  selected: (current: "preview" | "field" | "design" | "Export code") => void;
}) {
  const [selectedButton, setSelectedButton] = useState<
    "preview" | "field" | "design" | "Export code"
  >("field");

  return (
    <div className="  ">
    
    
      <div
        className="fixed z-30 pt-[80px] border-r-2 bg-white p-4 h-full w-auto flex flex-col items-center justify-start"
      >
        <div className="flex flex-col gap-2">
          <div
            className={`btn_sid ${
              selectedButton === "field"
                ? "bg-[#36b3fa] text-white"
                : "bg-white"
            }`}
            onClick={() => {
              setSelectedButton("field");
              selected("field");
            }}
          >
            <FiEdit />
            Field
          </div>
          <div
            className={`btn_sid ${
              selectedButton === "preview"
                ? "bg-[#36b3fa] text-white"
                : "bg-white"
            }`}
            onClick={() => {
              setSelectedButton("preview");
              selected("preview");
            }}
          >
            <MdOutlinePreview />
            Preview
          </div>
          <div
            className={`btn_sid ${
              selectedButton === "design"
                ? "bg-[#36b3fa] text-white"
                : "bg-white"
            }`}
            onClick={() => {
              setSelectedButton("design");
              selected("design");
            }}
          >
            <MdOutlineDesignServices />
            Design
          </div>
          <div
            className={`btn_sid ${
              selectedButton === "Export code"
                ? "bg-[#36b3fa] text-white"
                : "bg-white"
            }`}
            onClick={() => {
              setSelectedButton("Export code");
              selected("Export code");
            }}
          >
            <MdOutlineCode />
            Export code
          </div>
        </div>
      </div>

    </div>
  );
}
