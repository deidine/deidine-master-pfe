import React, { MouseEventHandler } from "react";
import { Badge } from "../../ui/badge";
import {
  inputTypeOptions,
  patternOptions,
  selectTypeOptions,
  dateInputs,
  otherTypes,
  logoHeadingTitle,
} from "@/data/data";
import { Badge as AntBadge } from "antd";

export default function BadgeElement({
  element,
  index,
  onClick,
}: {
  onClick?: MouseEventHandler;
  index: number;
  element: SelectElement | InputElement;
}) {
  const combinedList: InputTypeList[] = [
    ...selectTypeOptions,
    ...inputTypeOptions,
    ...otherTypes,
    ...dateInputs, ...logoHeadingTitle
  ];
 
  const filtredElemnt=element.type !== "logo" && element.type !== "headingTitle" ? element : null;

  // Filter out empty or incomplete elements and specific unwanted types
  const elementFilter = combinedList.filter(
      (el) =>
        el.value === element.type &&
        el.value != "logo" &&
        el.value != "headingTitle" &&
        el.bgColor &&
        el.textColor && 
        el.icon 
    )
    .map((el) => {
      return {
        bgColor: el.bgColor,
        textColor: el.textColor,
        icon: el.icon,
        value: el.value,
      };
    });

  return (
    <div
      key={index}
      className="flex flex-col w-full font-bold text-lg h-auto overflow-hidden"
    > 
      <div className="flex flex-col justify-start items-start pb-4">
        {element.label}
        <span className="text-sm text-gray-500">
          {element.type === "paragraph" ? "" : element.placeholder}
        </span>
      </div>
      <div className="flex flex-col w-full items-start space-y-2">
        <div
          className="flex flex-col gap-2 w-full items-start"
          onClick={onClick}
        >
          <div className="flex gap-2 flex-wrap"></div>
          <div className="flex flex-wrap gap-2">
            {elementFilter.length > 0 && (
              <AntBadge
                style={{
                  backgroundColor: elementFilter[0].bgColor,
                  color: "black",
                }}
                count={
                  element.options && element.options?.length !== 0
                    ? element.options.length
                    : 0
                }
              >
                <Badge
                  className="shadow-lg z-10 rounded-lg hover:outline-none h-8 text-[13px] font-semibold border-2 flex items-center gap-2"
                  style={{
                    backgroundColor: elementFilter[0].bgColor,
                    color: elementFilter[0].textColor,
                  }}
                >
                  {elementFilter[0].icon &&
                    React.createElement(elementFilter[0].icon)}
                  {element.type}
                </Badge>
              </AntBadge>
            )}
            <div className="pl-4">
              {element.required && (
                <Badge
                  variant={"destructive"}
                  className="shadow-lg z-10 rounded-lg border-red-400 text-red-400 hover:outline-none h-8 text-[13px] font-semibold border-2 flex items-center gap-2"
                >
                  Required
                </Badge>
              )}{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
