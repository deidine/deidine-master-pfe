import React from "react";
import { Button } from "antd";
import { logoHeadingTitle } from "@/data/data";
import OptionPopUp from "./OptionPopUp";
import useDesigner from "@/hooks/useDesigner";
import { newElement } from "@/utils/utilsFunctions";
import Image from 'next/image'; // Importing Image from next/image

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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 justify-around items-center">
        {logoHeadingTitle.map((option: any) => {
          const isElementAdded = elements.some(
            (el) => el.elementType.type === option.value
          );

          return (
            <div key={option.value} className="">
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
          .filter((element) => element.elementType.type === "logo")
          .map((element) => (
            <div
              key={element.elementType.name} // Added key here
              className="my-4 border group
               border-gray-50 hover:border-gray-300 hover:shadow-sm 
               p-4 rounded-lg bg-white hover:cursor-pointer relative"
              onClick={() => {
                setSelectedElement(element);
                setIsSidebarVisible(!isSidebarVisible);
              }}
            >
              <div className="flex items-center">
                <p className="text-xl font-bold group">
                  <span className="pr-4"> Logo Form: </span>
                </p>
                <Image
                  src={element.elementType.imgLogoLink!}
                  alt="Logo"
                  width={80} // Set width and height according to your needs
                  height={80}
                  className="shadow-sm group rounded-full"
                />
              </div>

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
      </div>
      <div>
        {elements
          .filter((element) => element.elementType.type === "headingTitle")
          .map((element) => (
            <div
              key={element.elementType.name} // Added key here
              className="my-4 border group
               border-gray-50 hover:border-gray-300 hover:shadow-sm 
               p-4 rounded-lg bg-white hover:cursor-pointer relative"
              onClick={() => {
                setSelectedElement(element);
                setIsSidebarVisible(!isSidebarVisible);
              }}
            >
              <p className="text-xl font-bold group">
                <span className="pr-4"> Form Title: </span>
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
      </div>
    </div>
  );
}
