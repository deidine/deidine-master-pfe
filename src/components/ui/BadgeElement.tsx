import {
  inputTypeOptions,
  patternOptions,
  selectTypeOptions,
} from "@/data/data";
import React, { MouseEventHandler } from "react";
import { Badge } from "./badge";

export default function BadgeElement({
  element,
  onClick,
}: {
  onClick: MouseEventHandler;
  element: SelectElement | InputElement;
}) {
  const elementTypeOptions = [...selectTypeOptions, ...inputTypeOptions];
  const elementType = elementTypeOptions.find(
    (option) => option.value === element.type
  );

  return (
    <div className="flex flex-col ">
      <div className=" p-2 w-full font-bold text-lg h-auto overflow-hidden">
        {element.label}
      </div>
      <div className="flex flex-col w-auto items-start space-y-2">
        <div
          className="flex flex-col gap-2 w-auto items-start  "
          onClick={onClick}
        >
          <Badge
            
            className={`bg-[${elementType?.bgColor}]  ${elementType?.textColor} border hover:outline-none flex items-center gap-2`}
          >
            {elementType?.icon && React.createElement(elementType.icon)}
            {element.type}
          </Badge>
          <div className="flex flex-wrap gap-2">
            {element.required ? (
              <Badge   variant={"destructive"}
              className="bg-red-400 " >
                Required
              </Badge>
            ) : (
              <></>
            )}

            <Badge  className="bg-blue-500">
              {element.placeholder}
            </Badge>

            {element.pattern!.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {patternOptions.map(
                  (option, index) =>
                    option.value !== "" &&
                    element.pattern!.includes(option.pattern!) && (
                      <Badge className="bg-blue-500" key={index} >
                        {option.label}
                      </Badge>
                    )
                )}
              </div>
            ) : (
              <></>
            )}
            {element.options && (
              <Badge className="bg-green-500" >
                options
                <div
                  className={`rounded-full w-6 h-6 ${
                    element.options.length != 2
                      ? "bg-yellow-700 "
                      : "bg-red-700"
                  }`}
                >
                  {element.options.length}
                </div>
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
