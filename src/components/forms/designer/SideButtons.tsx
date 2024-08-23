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
        className="fixed z-30 pt-[180px] top-0 border-r-2 bg-white p-4 h-full w-auto flex flex-col items-center justify-start"
      >
        <div className="flex flex-col gap-2">
          <div
            className={`btn_sid ${
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
            className={`btn_sid ${
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
            className={`btn_sid ${
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
            className={`btn_sid ${
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
