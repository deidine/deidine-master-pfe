"use client";
import { CloseCircleOutlined } from "@ant-design/icons";
import useDesigner from "@/hooks/useDesigner";
import SubmitButton from "@/components/ui/SubmitButton";
import DragDropAria from "./DragDropAria";
import { useState, useEffect } from "react";
import SidBarOptions from "@/components/sidBarOptions/SidBarOptions";
 
import React from "react";
import LogoTitleCard from "./LogoTitleCard";

export default function FormBuilder() {
  const { elements, selectedElement, setIsSidebarVisible, isSidebarVisible } =
    useDesigner();
  const [labelCurent, setLabelCurent] = useState(
    selectedElement?.elementType.label
  );

  // Update the labelCurent state when the selectedElement changes
  useEffect(() => {
    if (selectedElement) {
      setLabelCurent(selectedElement.elementType.label);
    }
  }, [selectedElement]);
 

  return (
    <div className="w-full h-full  flex flex-col justify-center  items-center pb-8">
      {" "}
      <div className="max-w-2xl mt-3 bg-white border shadow rounded-xl w-1/2 h-auto p-10 ml-4">
      <div className="  flex flex-col relative justify-between w-full p-4 mb-2 border rounded-xl shadow-sm ">
   <LogoTitleCard   />
      </div>
        
        {elements.length === 0 &&    <div className=" text-center p-10 w-full text-md font-title"> 
   
   Aucun élément n’a encore été ajouté 
    </div>}
        <DragDropAria />
        {isSidebarVisible && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-auto transition-opacity duration-300 ease-in-out"
            onClick={() => {
              setIsSidebarVisible(!isSidebarVisible);
            }}
          >
            <div
              className="absolute top-0 right-0 w-full md:w-1/3 sm:w-[200px] pl-3 overflow-y-scroll scroll-m-0 h-full bg-white shadow-lg z-50 sidebar transition-transform duration-300 transform translate-x-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between uppercase p-4 text-[20px]  font-bold font-mono border-b">
            {selectedElement?.elementType.type==="paragraph" ? "":labelCurent}    
                <CloseCircleOutlined
                  className="text-red-500 font-bold text-[20px] transition-colors"
                  onClick={() => {
                    setIsSidebarVisible(false);
                  }}
                />
              </div>
              <div className="p-6">
                <SidBarOptions element={selectedElement?.elementType} />
              </div>
            </div>
          </div>
        )}
        <SubmitButton />
      </div>
    </div>
  );
}
