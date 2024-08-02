import React, { useState,MouseEventHandler, useRef } from "react";
import { Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import useDesigner from "@/hooks/useDesigner";
import OptionPopUp from "@/components/ui/OptionPopUp";
import SidBarOptions from "@/components/ui/SidBarOptions";
import AutoResizeTextarea from "@/components/ui/AutoResizeTextarea";
import BadgeElement from "@/components/ui/BadgeElement";
import CardEditElement from "@/components/ui/CardEditElement"; 
export default function FormElement({
  element, 
  index,
}: {
  index: number;
  element: SelectElement | InputElement; 
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [inputLabel, setInputLabel] = useState(element.label);
  const { removeElement, setIsEditFormCard,updateElement } = useDesigner();

  const editButtonRef = useRef<HTMLDivElement>(null);
  const colseSideBarref = useRef<any>(null);

  const handleLabelChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputLabel(e.target.value); 
    updateElement(element.name, { ...element, label: e.target.value }  );
  };

  const handleDivClick = (e: React.MouseEvent) => { 
    // if (!isEditing) {
    //   setIsSidebarVisible(true);
    //   setIsEditFormCard(true);
    // }
  };
 
  return (
    <div
      key={index}
      ref={editButtonRef}
      onClick={handleDivClick}
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
            <CardEditElement element={element}  />
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
        index={index}
          name={element.name}
          removeElement={(name: string) => {
            removeElement(name);
          }}
          isEditingSate={isEditing ? false : true}
          setIsEditingState={( ) => {
            setIsEditing(isEditing ? false : true);
          }}
          toogleSidBar={( ) => setIsSidebarVisible(isSidebarVisible ? false : true)}
        />
      </div>
      {isSidebarVisible && (
        <div
          className={`fixed top-0 right-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto transition-all duration-300 ease-in-out`}
          onClick={() => {
            setIsSidebarVisible(false);
            setIsEditFormCard(false);
            colseSideBarref.current?.click();
          }}
        >
          <div
            className={`absolute top-0 right-0 w-1/3 pl-3 h-full bg-white shadow-lg z-50 sidebar`}
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              ref={colseSideBarref}
              onClick={() => {
                setIsSidebarVisible(false);
                setIsEditFormCard(false);
              }}
              icon={<CloseCircleOutlined />}
            />
            <SidBarOptions element={element}   />
          </div>
        </div>
      )}
    </div>
  );
}
