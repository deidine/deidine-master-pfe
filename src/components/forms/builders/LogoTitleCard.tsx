import React, { useState } from "react";
import { Button } from "antd";
import { logoHeadingTitle } from "@/data/data";
import OptionPopUp from "./OptionPopUp";
import useDesigner from "@/hooks/useDesigner";
import { newElement } from "@/utils/utilsFunctions";

export default function LogoTitleCard() {
  const {
    addElement,
    elements,
    selectedElement,
    removeElement,
    setIsSidebarVisible,
    isSidebarVisible,
    setSelectedElement,
  } = useDesigner();

  const handleSelect = (option: any) => {
    const newElementInstance = newElement(option.value);
    addElement(elements.length, newElementInstance);
    setSelectedElement(newElementInstance);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 justify-around items-center">
        {logoHeadingTitle.map((option) => {
          const isElementAdded = elements.some(
            (el) => el.elementType.type === option.value
          );

          return (
            <div key={option.value} className="relative group">
              {!isElementAdded && (
                <Button onClick={() => handleSelect(option)}>
                  {option.icon && React.createElement(option.icon)}
                  {option.label}
                </Button>
              )}
            </div>
          );
        })}
      </div>
      <div>
        {elements
          .filter(
            (element) =>
              element.elementType.type === "logo" ||
              element.elementType.type === "headingTitle"
          )
          .map((element, index) => (
            <>
              {" "}
              <div key={index} className="my-4">
                {element.elementType.type === "logo" && (
                  <img
                    src={element.elementType.imgLogoLink}
                    alt="Logo"
                    className="h-16 w-auto"
                  />
                )}
                {element.elementType.type === "headingTitle" && (
                  <p className="text-xl font-bold">
                    {element.elementType.headingTitle}
                  </p>
                )}
              </div>
              <OptionPopUp
                form={element}
                name={element.elementType.name}
                removeElement={(name: string) => {
                  removeElement(name);
                }}
                toogleSidBar={() => {
                  setIsSidebarVisible(!isSidebarVisible);
                }}
              />
            </>
          ))}
      </div>
    </div>
  );
}
