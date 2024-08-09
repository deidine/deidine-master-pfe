import React, { useState, useEffect } from "react";
import {  Button,  Form } from "antd";
import useDesigner from "@/hooks/useDesigner";
import InputPrev from "./elementTypePreview/InputPrev";
import DatePrev from "./elementTypePreview/DatePrev";
import SelectPrev from "./elementTypePreview/SelectPrev";
import CheckBoxPrev from "./elementTypePreview/CheckBoxPrev";
import RadioPrev from "./elementTypePreview/RadioPrev";

export default function PreviewForm({
  isTemplate,
  showSubmit,
  elementsTemplate,
}: {
  isTemplate?: boolean;
  showSubmit?: boolean;
  elementsTemplate?: Form[] | FormElement[];
}) {
  const onFinish = (values: any) => {
    console.log("Form submitted:", values);
    setSubmitted(true);
  };
  const [submitted, setSubmitted] = useState(false);
  const [isTemlate, setisTemlate] = useState<boolean>(isTemplate || false);
  const [elementsTemplatePreviw, setElementsTemplatePreviw] = useState<
    Form[] | FormElement[]
  >(elementsTemplate!);
  const { elements, submitBtn } = useDesigner();
  const mapElement = isTemlate ? elementsTemplatePreviw : elements;

  useEffect(() => {
    setElementsTemplatePreviw(elementsTemplate!);
  }, [elementsTemplate]);

 
  return (
    <Form
      onFinish={onFinish}
      layout="vertical" // Set the layout to vertical
      className={`${
        !isTemplate
          ? "max-w-2xl mt-3  bg-white border shadow rounded-xl w-1/2 h-auto p-10 ml-4"
          : ""
      }`}
    >
    <span className="text-md font-semibold"> {elements.length==0 && "No elements to Preview"}</span> 

      {mapElement.map((element: any, index) => (
        <div key={index}>
          {["text", "number", "email", "password", "file", "textarea","url"].includes(
            element.elementType.type
          ) && <InputPrev element={element} />}

          {["datetime-local", "date"].includes(element.elementType.type) && (
            <DatePrev element={element} />
          )}

          {element.elementType.type === "time" && (
         <DatePrev element={element} isTime={true} />
          )}

          {element.elementType.type === "select" && (
            <SelectPrev element={element} />
          )}
          {element.elementType.type === "select_multiple" && (
            <SelectPrev element={element} isMultiple={true} />
         
          )}
          {element.elementType.type === "checkbox" && (
            <CheckBoxPrev element={element} />
          )}
          {element.elementType.type === "radio" && (
            <RadioPrev element={element} />
          )}
        </div>
      ))}
      <div className="flex justify-center pt-6">
        {showSubmit ? null : (
          <Button
            type="primary"
            htmlType="submit"
            className="h-10 font-bold py-2 px-4 w-1/2"
          >
            {submitBtn}
          </Button>
        )}
      </div>
    </Form>
  );
}

