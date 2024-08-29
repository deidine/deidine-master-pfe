import React from "react";
import { Button } from "antd";
import { logoHeadingTitle } from "@/data/data";
import OptionPopUp from "./OptionPopUp";
import useDesigner from "@/hooks/useDesigner";
import { newElement } from "@/utils/utilsFunctions";
import Image from "next/image";

export default function LogoTitleCard() {
  const {
    addElement,
    elements,
    setSelectedElement,
    setIsSidebarVisible,
    isSidebarVisible,
    removeElement,
  } = useDesigner();

  const handleSelect = (option: any) => {
    const newElementInstance = newElement(option.value);
    addElement(elements.length, newElementInstance);
    setSelectedElement(newElementInstance);
  };

  const isElementAdded0 = elements.some(
    (el) => el.elementType.type === logoHeadingTitle[0].value
  );
  const isElementAdded1 = elements.some(
    (el) => el.elementType.type === logoHeadingTitle[1].value
  );

  const showSpan = !isElementAdded0 && !isElementAdded1;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center items-center gap-4 m-4">
        <div className="flex-1 flex flex-col ">
          {elements
            .filter((element) => element.elementType.type === "logo")
            .map((element) => (
              <div
                key={element.elementType.name}
                className="border group border-gray-50 hover:border-gray-300 hover:shadow-sm p-4 rounded-lg bg-white hover:cursor-pointer relative flex items-center justify-center"
                style={{ height: "150px" }} // Set a fixed height for uniform size
                onClick={() => {
                  setSelectedElement(element);
                  setIsSidebarVisible(!isSidebarVisible);
                }}
              >
                <Image
                  src={element.elementType.imgLogoLink!}
                  alt="Logo"
                  width={80}
                  height={80}
                />

                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <OptionPopUp
                    form={element} 
                    name={element.elementType.name}
                    removeElement={(name: string) => removeElement(name)}
                    toogleSidBar={() => setIsSidebarVisible(!isSidebarVisible)}
                  />
                </div>
              </div>
            ))}
          <Button
            hidden={isElementAdded0}
            className="mx-auto"
            onClick={() => handleSelect(logoHeadingTitle[0])}
          >
            {logoHeadingTitle[0].icon &&
              React.createElement(logoHeadingTitle[0].icon)}
            {logoHeadingTitle[0].label}
          </Button>
        </div>

        <span
          className={`border-[1px] border-gray-300 pt-4 ${
            showSpan ? "h-[40px]" : "h-[150px]"
          } w-[1px]`}
        />

        <div className="flex-1 flex flex-col  ">
          {elements
            .filter((element) => element.elementType.type === "headingTitle")
            .map((element) => (
              <div
                key={element.elementType.name}
                className="border group border-gray-50 hover:border-gray-300 hover:shadow-sm p-4 rounded-lg bg-white hover:cursor-pointer relative flex items-center justify-center"
                style={{ height: "150px" }} // Set the same height as the image div
                onClick={() => {
                  setSelectedElement(element);
                  setIsSidebarVisible(!isSidebarVisible);
                }}
              >
                <p className="text-xl font-bold text-center">
                  {element.elementType.headingTitle}
                </p>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <OptionPopUp
                    form={element}
                    name={element.elementType.name}
                    removeElement={(name: string) => removeElement(name)}
                    toogleSidBar={() => setIsSidebarVisible(!isSidebarVisible)}
                  />
                </div>
              </div>
            ))}
          <Button
            hidden={isElementAdded1}
            className="mx-auto"
            onClick={() => handleSelect(logoHeadingTitle[1])}
          >
            {logoHeadingTitle[1].icon &&
              React.createElement(logoHeadingTitle[1].icon)}
            {logoHeadingTitle[1].label}
          </Button>
        </div>
      </div>
    </div>
  );
}
