import {
  inputTypeOptions,
  patternOptions,
  selectTypeOptions,
} from "@/data/data";
import { Button } from "antd";
import React, { MouseEventHandler } from "react";

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
          <Button
            size="small"
            className={`${elementType?.bgColor} ${elementType?.textColor} flex items-center gap-2`}
          >
             
            {elementType?.icon && React.createElement(elementType.icon)} 
            {element.type}
          </Button>
          <div className="flex flex-wrap gap-2">
            <Button
              className={`${element.required ? "bg-red-500" : "bg-yellow-400"}`}
              size="small"
            >
              {element.required ? "Required" : "Not Required"}
            </Button>
            <div>{}</div>
            <Button size="small" className="bg-blue-500">
               
              {element.placeholder}
            </Button>

            {element.pattern!.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {patternOptions.map(
                  (option, index) =>
                    option.value !== "" &&
                    element.pattern!.includes(option.pattern!) && (
                      <Button className="bg-blue-500" key={index} size="small">
                        {option.label}
                      </Button>
                    )
                )} 
              </div>
            ) : (
              <></>
            )}
            {element.options && (
              <Button className="bg-green-500" size="small">
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
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
