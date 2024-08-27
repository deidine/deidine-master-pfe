import React, { useState, useRef } from "react"; 
import useDesigner from "@/hooks/useDesigner";
import OptionPopUp from "@/components/forms/builders/OptionPopUp"; 
import BadgeElement from "@/components/forms/builders/BadgeElement";
 
export default function FormElement({
  form,
  element,
  index,
}: {
  index: number;
  element: SelectElement | InputElement;
  form: FormElement;
}) { 
  const {
    removeElement, 
    setIsSidebarVisible,
    isSidebarVisible,
  } = useDesigner();

  const editButtonRef = useRef<HTMLDivElement>(null);

 
  return (
    <div
      key={index}
      ref={editButtonRef}
      onClick={() => {
        setIsSidebarVisible(!isSidebarVisible);
      }}
      className={`  flex flex-col relative
        
        justify-between w-full p-4 mb-2 border-[1px] border-gray-200 rounded-xl shadow-sm group`}
    > 
      <div className="flex flex-col space-y-3  relative flex-1">
        <BadgeElement index={index} element={element} />
        <OptionPopUp
          index={index}
          form={form}
          name={element.name}
          removeElement={(name: string) => {
            removeElement(name);
          }}
          toogleSidBar={() => {
            setIsSidebarVisible(!isSidebarVisible);
          }}
        />
      </div>
    </div>
  );
}
