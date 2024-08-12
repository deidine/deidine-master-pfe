"use client";
import { CloseCircleOutlined } from "@ant-design/icons";
import useDesigner from "@/hooks/useDesigner";
import { useHotkeys } from "react-hotkeys-hook"; 
import SubmitButton from "@/components/ui/SubmitButton";
import DragDropAria from "./formBuilderElements/DragDropAria";
import { useState } from "react";
import { Button } from "antd";
import SidBarOptions from "@/components/sidBarOptions/SidBarOptions";

export default function FormBuilder() {
  const { undo, redo ,elements,selectedElement ,setIsSidebarVisible,isSidebarVisible} = useDesigner();
 
  useHotkeys("ctrl+z, meta+z", undo, { preventDefault: true });
  useHotkeys("ctrl+y, meta+y", redo, { preventDefault: true });
  const handleDivClick = (e: React.MouseEvent) => {
     
        setIsSidebarVisible(true);
   
  };
  return (
    <div className="max-w-2xl mt-3   bg-white border shadow rounded-xl w-1/2 h-auto p-10 ml-4">
      {/* <div className="flex justify-between mb-4">
      <Button onClick={undo} disabled={undoStack.length === 0}>
          Undo
        </Button>
        <Button onClick={redo} disabled={redoStack.length === 0}>
          Redo
        </Button>
      </div> */}
     <span className="text-md font-semibold"> {elements.length==0 && "No elements added yet"}</span> 

      <DragDropAria />
      {isSidebarVisible && (
        <div
          className="fixed inset-0  bg-black bg-opacity-50 z-50 overflow-auto transition-opacity duration-300 ease-in-out"
          onClick={() => {
            setIsSidebarVisible(!isSidebarVisible);
             // colseSideBarref.current?.click();
          }}
        >
          <div
            className="absolute top-0 right-0   w-full md:w-1/3 sm:w-[200px] pl-3 overflow-y-scroll scroll-m-0 h-full bg-white shadow-lg z-50 sidebar transition-transform duration-300 transform translate-x-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end p-4 border-b">
              <Button 
                onClick={() => {
                  setIsSidebarVisible(false);
                 }}
                icon={<CloseCircleOutlined />}
                className="text-red-500 hover:text-red-700 transition-colors"
              />
            </div>
            <div className="p-6">
              <SidBarOptions element={selectedElement?.elementType} />
            </div>
          </div>
        </div>
      )}
      <SubmitButton/>
    </div>
  );
}
