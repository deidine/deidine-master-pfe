import React, { useState, useRef } from "react";
import { Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import useDesigner from "@/hooks/useDesigner";
import OptionPopUp from "@/components/forms/builders/OptionPopUp";
import SidBarOptions from "@/components/sidBarOptions/SidBarOptions";
import AutoResizeTextarea from "@/components/ui/AutoResizeTextarea";
import BadgeElement from "@/components/ui/BadgeElement";
import CardEditElement from "@/components/forms/builders/formBuilderElements/CardEditElement"; 
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
    if (!isEditing) {
      setIsSidebarVisible(true);
      setIsEditFormCard(true);
    }
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
      <>
      {isSidebarVisible && (
        <div
          className="fixed inset-0  bg-black bg-opacity-50 z-50 overflow-auto transition-opacity duration-300 ease-in-out"
          onClick={() => {
            setIsSidebarVisible(false);
            setIsEditFormCard(false);
            colseSideBarref.current?.click();
          }}
        >
          <div
            className="absolute top-0 right-0   w-full md:w-1/3 sm:w-[200px] pl-3 overflow-y-scroll scroll-m-0 h-full bg-white shadow-lg z-50 sidebar transition-transform duration-300 transform translate-x-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end p-4 border-b">
              <Button
                ref={colseSideBarref}
                onClick={() => {
                  setIsSidebarVisible(false);
                  setIsEditFormCard(false);
                }}
                icon={<CloseCircleOutlined />}
                className="text-red-500 hover:text-red-700 transition-colors"
              />
            </div>
            <div className="p-6">
              <SidBarOptions element={element} />
            </div>
          </div>
        </div>
      )}
    </>
    </div>
  );
}
