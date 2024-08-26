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
  selected: (current: "Champ"|
  "Aperçu"|
  "Concevoir"|
  "Code") => void;
}) {
  const [selectedButton, setSelectedButton] = useState<
    "Champ"|
  "Aperçu"|
  "Concevoir"|
  "Code"
  >("Champ");

  return (
    <div className="  ">
    
    
      <div
        className="fixed z-30 pt-[80px] top-0 border-r-[1px] border-gray-200
         bg-white p-4 h-full w-auto flex flex-col items-center justify-start"
      >
        <div className="flex flex-col gap-2">
          <div
            className={`btn_sid flex flex-row gap-3 justify-between items-center ${
              selectedButton === "Champ"
                ? "bg-buttonColor text-white"
                : "bg-white"
            }`}
            onClick={() => {
              setSelectedButton("Champ");
              selected("Champ");
            }}
          >
            <FiEdit />
            Champ
          </div>
          <div
            className={`btn_sid flex flex-row gap-3 justify-between items-center ${
              selectedButton === "Aperçu"
                ? "bg-buttonColor text-white"
                : "bg-white"
            }`}
            onClick={() => {
              setSelectedButton("Aperçu");
              selected("Aperçu");
            }}
          >
            <MdOutlinePreview />
            Aperçu
          </div>
          <div
            className={`btn_sid flex flex-row gap-3 justify-between items-center ${
              selectedButton === "Concevoir"
                ? "bg-buttonColor text-white"
                : "bg-white"
            }`}
            onClick={() => {
              setSelectedButton("Concevoir");
              selected("Concevoir");
            }}
          >
            <MdOutlineDesignServices />
            Concevoir
          </div>
          <div
            className={`btn_sid flex flex-row gap-3 justify-between items-center ${
              selectedButton === "Code"
                ? "bg-buttonColor text-white"
                : "bg-white"
            }`}
            onClick={() => {
              setSelectedButton("Code");
              selected("Code");
            }}
          >
            <MdOutlineCode />
            Code  
          </div>
        </div>
      </div>

    </div>
  );
}
