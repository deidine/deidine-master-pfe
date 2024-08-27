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
  selected: (current: "Modifier" | "Visionner" | "Stylisation" | "Générateur") => void;
}) {
  const [selectedButton, setSelectedButton] = useState<
    "Modifier" | "Visionner" | "Stylisation" | "Générateur"
  >("Modifier");

  return (
    <div className="  ">
      <div
        className="fixed z-10 pt-[150px] top-0 border-r-[1px] border-gray-200
         bg-white p-4 h-full w-auto flex flex-col items-center justify-start"
      >
        <div className="flex flex-col gap-2">
          <div
            className={`btn_sid flex flex-row gap-3 justify-between items-center ${
              selectedButton === "Modifier"
                ? "bg-buttonColor text-white"
                : "bg-white"
            }`}
            onClick={() => {
              setSelectedButton("Modifier");
              selected("Modifier");
            }}
          >
            <div className="flex flex-row gap-3 justify-between items-center">
              <FiEdit className="text-3xl size-5" />
              Modifier{" "}
            </div>
          </div>
          <div
            className={`btn_sid flex flex-row gap-3 justify-between items-center ${
              selectedButton === "Visionner"
                ? "bg-buttonColor text-white"
                : "bg-white"
            }`}
            onClick={() => {
              setSelectedButton("Visionner");
              selected("Visionner");
            }}
          >
            <div className="flex flex-row gap-3 justify-between items-center">
              {" "}
              <MdOutlinePreview className="text-3xl size-5" />
              Visionner{" "}
            </div>
          </div>
          <div
            className={`btn_sid flex flex-row gap-3 justify-between items-center ${
              selectedButton === "Stylisation"
                ? "bg-buttonColor text-white"
                : "bg-white"
            }`}
            onClick={() => {
              setSelectedButton("Stylisation");
              selected("Stylisation");
            }}
          >
            <div className="flex flex-row gap-3 justify-between items-center">
              {" "}
              <MdOutlineDesignServices className="text-3xl size-5" />
              Stylisation{" "}
            </div>
          </div>
          <div
            className={`btn_sid flex flex-row gap-3 justify-between items-center ${
              selectedButton === "Générateur"
                ? "bg-buttonColor text-white"
                : "bg-white"
            }`}
            onClick={() => {
              setSelectedButton("Générateur");
              selected("Générateur");
            }}
          >
            <div className="flex flex-row gap-3 justify-between items-center">
              {" "}
              <MdOutlineCode className="text-3xl size-5" />
              Générateur{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
