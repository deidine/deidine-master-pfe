import React, { useState, useRef } from "react";
import { Button } from "antd";
import useDesigner from "@/hooks/useDesigner";
import OptionPopUp from "@/components/forms/builders/OptionPopUp";
import SidBarOptions from "@/components/sidBarOptions/SidBarOptions";
import AutoResizeTextarea from "@/components/ui/AutoResizeTextarea";
import BadgeElement from "@/components/forms/builders/formBuilderElements/BadgeElement";
import CardEditElement from "@/components/forms/builders/formBuilderElements/CardEditElement"; 

export default function FormElement({
  element, 
  index,
}: {
  index: number;
  element: SelectElement | InputElement; 
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputLabel, setInputLabel] = useState(element.label);
  const { removeElement , updateElement,setIsSidebarVisible,isSidebarVisible  } = useDesigner();

  const editButtonRef = useRef<HTMLDivElement>(null);

  const handleLabelChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputLabel(e.target.value); 
    updateElement(element.name, { ...element, label: e.target.value });
  };


  return (
    <div
      key={index}
      ref={editButtonRef} 
      onClick={() => {
        setIsSidebarVisible(!isSidebarVisible);
      }}
      className={`${
        isEditing ? "" : "hover:bg-slate-200"
      } flex flex-col relative justify-between w-full p-4 mb-2 border rounded-xl shadow-sm group`}
    >
      <div className="flex flex-col space-y-3  relative flex-1">
        {isEditing ? (
          <>
            <AutoResizeTextarea
              inputLabel={inputLabel}
              handleLabelChange={handleLabelChange}
              isEditing={isEditing}
            />
            <CardEditElement element={element} />
          </>
        ) : (
          <>
            <BadgeElement
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(!isEditing);
               }}
              element={element}
            />
          </>
        )}
        <OptionPopUp
          name={element.name}
          removeElement={(name: string) => {
            removeElement(name);
          }}
          isEditingSate={!isEditing}
          setIsEditingState={(value: boolean) => {
            setIsEditing(!isEditing);
            
          }}
          toogleSidBar={() => {
            setIsSidebarVisible(!isSidebarVisible)
            
           }}
        />
      </div>
   
    </div>
  );
}
