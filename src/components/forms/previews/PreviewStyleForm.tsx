import React, { useState } from "react";
import { Button, Form, Slider } from "antd";
import useDesigner from "@/hooks/useDesigner";
import InputPrev from "./elementTypePreview/InputPrev";
import DatePrev from "./elementTypePreview/DatePrev";
import SelectPrev from "./elementTypePreview/SelectPrev";
import CheckBoxPrev from "./elementTypePreview/CheckBoxPrev";
import RadioPrev from "./elementTypePreview/RadioPrev"; 
import useStyle from "@/hooks/useStyle";
import StylingForm from "../styleForm/allStylePattern/stylingForm";
import StylingElements from "../styleForm/allStylePattern/stylingElements";
import StylingButton from "../styleForm/allStylePattern/stylingButton";
export default function PreviewformStyles( )  {
const  { formStyle,elementStyle,buttonStyle}=useStyle(); 
  const { elements, submitBtn } = useDesigner();

  const getFormStyles = () => {
    return {
      paddingLeft: formStyle?.paddingX  ,
      paddingRight: formStyle?.paddingX  ,
      paddingTop: formStyle?.paddingY  ,
      paddingBottom: formStyle?.paddingY ,
      color: formStyle?.color, 
      border: formStyle?.border ,
      borderRadius: formStyle?.borderRadius ,
      backgroundColor: formStyle?.backgroundColor,
    };
  };

  return (
    <>
      <div className="w-1/4   pl-40 bg-white">
        <StylingForm
          currentStyling="Form" 
        />
        <StylingElements
          currentStyling="Elements"
         
        />
        <StylingButton
          currentStyling="Buttons"
         
        />
      </div>
      <Form
        layout="vertical"
        className={`${"max-w-2xl mt-3 bg-white border shadow rounded-xl w-1/2 h-full p-10 ml-4"}`}
        style={getFormStyles()}
      >
        <span className="text-md font-semibold">
          {elements.length === 0 && "No elements to Preview"}
        </span>

        {elements.map((element: any, index) => (
          <div key={index}>
            {[
              "text",
              "number",
              "email",
              "password",
              "file",
              "textarea",
              "url",
            ].includes(element.elementType.type) && (
              <InputPrev styleForm={elementStyle} element={element} />
            )}

            {["datetime-local", "date"].includes(element.elementType.type) && (
              <DatePrev styleForm={elementStyle} element={element} />
            )}

            {element.elementType.type === "time" && (
              <DatePrev styleForm={elementStyle} element={element} isTime={true} />
            )}

            {element.elementType.type === "select" && (
              <SelectPrev styleForm={elementStyle} element={element} />
            )}
            {element.elementType.type === "select_multiple" && (
              <SelectPrev styleForm={elementStyle} element={element} isMultiple={true} />
            )}
            {element.elementType.type === "checkbox" && (
              <CheckBoxPrev styleForm={elementStyle} element={element} />
            )}
            {element.elementType.type === "radio" && (
              <RadioPrev styleForm={elementStyle} element={element} />
            )}
          </div>
        ))}

        <div className="flex justify-center pt-6">
          <Button
            type="primary"
            htmlType="submit"
            className="h-10 font-bold py-2 px-4 w-1/2"
          >
            {submitBtn}
          </Button>
        </div>
      </Form>
    </>
  );
}
