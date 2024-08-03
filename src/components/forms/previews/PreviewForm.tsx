import React, { useState, useEffect } from "react";
import {
  Button,
  Form 
} from "antd";
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

  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded">
          <h1 className="text-2xl font-bold">Form submitted</h1>
          <p className="text-muted-foreground">
            Thank you for submitting the form, you can close this page now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Form
      onFinish={onFinish}
      layout="vertical" // Set the layout to vertical
      className={`${
        !isTemplate
          ? "max-w-2xl mt-3 border shadow rounded-xl w-1/2 h-auto p-10 ml-4"
          : ""
      }`}
    >
      {mapElement.map((element: any, index) => (
        <div key={index}>
          {["text", "number", "email", "password", "file", "textarea"].includes(
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

