"use client";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import {
  MdOutlineDesignServices,
  MdOutlineCode,
  MdOutlinePreview,
} from "react-icons/md"; 

export default function SideButtons({
  selected,
}: {
  selected: (current: "Champ" | "Aperçu" | "Concevoir" | "Code") => void;
}) {
  const [selectedButton, setSelectedButton] = useState<
    "Champ" | "Aperçu" | "Concevoir" | "Code"
  >("Champ");

  return (
    <div className="  ">
      <div
        className="fixed z-30 pt-[140px] top-0 border-r-[1px] border-gray-200
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
            <div className="flex flex-row gap-3 justify-between items-center">
              <FiEdit className="text-3xl size-5" />
              Champ{" "}
            </div>
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
            <div className="flex flex-row gap-3 justify-between items-center">
              {" "}
              <MdOutlinePreview className="text-3xl size-5" />
              Aperçu{" "}
            </div>
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
            <div className="flex flex-row gap-3 justify-between items-center">
              {" "}
              <MdOutlineDesignServices className="text-3xl size-5" />
              Concevoir{" "}
            </div>
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
            <div className="flex flex-row gap-3 justify-between items-center">
              {" "}
              <MdOutlineCode className="text-3xl size-5" />
              Code{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
