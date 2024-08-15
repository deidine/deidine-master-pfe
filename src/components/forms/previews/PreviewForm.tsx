import React, { useState, useEffect } from "react";
import { Button, Form } from "antd";
import useDesigner from "@/hooks/useDesigner";
import InputPrev from "./elementTypePreview/InputPrev";
import DatePrev from "./elementTypePreview/DatePrev";
import SelectPrev from "./elementTypePreview/SelectPrev";
import CheckBoxPrev from "./elementTypePreview/CheckBoxPrev";
import RadioPrev from "./elementTypePreview/RadioPrev";
import useStyle from "@/hooks/useStyle";
import HeadingPrev from "./elementTypePreview/HeadingPrev";

export default function PreviewForm({
  isTemplate,
  showSubmit,
  elementsTemplate,
  form,
}: {
  isTemplate?: boolean;
  showSubmit?: boolean;
  form?: Form;
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
  const { formStyle, elementStyle, buttonStyle } = useStyle();
  const { elements, submitBtn } = useDesigner();
  const mapElement = isTemlate ? elementsTemplatePreviw : elements;

  const getFormStyles = () => {
    return isTemlate ? {
      paddingLeft: formStyle?.paddingX,
      paddingRight: formStyle?.paddingX,
      paddingTop: formStyle?.paddingY,
      paddingBottom: formStyle?.paddingY,
      color: formStyle?.color,
      border: formStyle?.border,
      borderRadius: formStyle?.borderRadius,
      backgroundColor: formStyle?.backgroundColor,
    } : {}
  };

  useEffect(() => {
    setElementsTemplatePreviw(elementsTemplate!);
  }, [elementsTemplate]);

  return (
    <Form
      onFinish={onFinish}
      layout="vertical"
      className={`${
        !isTemplate
          ? "max-w-2xl mt-3 bg-white  border shadow rounded-xl w-1/2 h-auto p-10 ml-4"
          : ""
      }`}
      style={getFormStyles()}
    >
      <p className="text-red-600">{form && form?.style?.backgroundColor}</p>
      <span className="text-md font-semibold">
        {elements.length === 0 && "No elements to Preview"}
      </span>

      {mapElement.map((element: any, index) => (
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
            <InputPrev styleForm={isTemlate ? elementStyle : {}} element={element} />
          )}

          {["datetime-local", "date"].includes(element.elementType.type) && (
            <DatePrev styleForm={isTemlate ? elementStyle : {}} element={element} />
          )}

          {element.elementType.type === "time" && (
            <DatePrev styleForm={isTemlate ? elementStyle : {}} element={element} isTime />
          )}

          {element.elementType.type === "select" && (
            <SelectPrev styleForm={isTemlate ? elementStyle : {}} element={element} />
          )}

          {element.elementType.type === "select_multiple" && (
            <SelectPrev styleForm={isTemlate ? elementStyle : {}} element={element} isMultiple />
          )}

          {element.elementType.type === "checkbox" && (
            <CheckBoxPrev styleForm={isTemlate ? elementStyle : {}} element={element} />
          )}

          {element.elementType.type === "radio" && (
            <RadioPrev styleForm={isTemlate ? elementStyle : {}} element={element} />
          )}
          {element.elementType.type === "heading" && (
            <HeadingPrev element={element} styleForm={isTemlate ? elementStyle : {}} />
          )}
        </div>
      ))}

      <div className="flex justify-center pt-6">
        {showSubmit ? (
          <Button
            type="primary"
            htmlType="submit"
            className="h-10 font-bold py-2 px-4 w-1/2"
          >
            {submitBtn}
          </Button>
        ): null }
      </div>
    </Form>
  );
}
