import React, { useState } from "react";
import { Button, Form, Slider } from "antd";
import useDesigner from "@/hooks/useDesigner";
import InputPrev from "./elementTypePreview/InputPrev";
import DatePrev from "./elementTypePreview/DatePrev";
import SelectPrev from "./elementTypePreview/SelectPrev";
import CheckBoxPrev from "./elementTypePreview/CheckBoxPrev";
import RadioPrev from "./elementTypePreview/RadioPrev";
import Styling from "../styleForm/styling";
export default function PreviewformStyles({
  form,
}: {
  form?: Form; 
}) {
  const [formStyles, setFormStyles] = useState<FormStyle | undefined>(
    form?.style
  );
  const [elementsStyles, setElementsStyles] = useState<FormStyle | undefined>(
    form?.style
  );
  const [buttonStyles, setButtonStyles] = useState<FormStyle | undefined>(
    form?.style
  );

  const { elements, submitBtn } = useDesigner();

  const getFormStyles = () => {
    return {
      paddingLeft: formStyles?.paddingX  ,
      paddingRight: formStyles?.paddingX  ,
      paddingTop: formStyles?.paddingY  ,
      paddingBottom: formStyles?.paddingY ,
      color: formStyles?.color, 
      border: formStyles?.border ,
      borderRadius: formStyles?.borderRadius ,
      backgroundColor: formStyles?.backgroundColor,
    };
  };

  return (
    <>
      <div className="w-1/4   pl-40 bg-white">
        <Styling
          currentStyling="Form"
          form={form}
          handelStylingChanging={setFormStyles}
        />
        <Styling
          currentStyling="Elements"
          form={form}
          handelStylingChanging={setElementsStyles}
        />
        <Styling
          currentStyling="Button"
          form={form}
          handelStylingChanging={setButtonStyles}
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
              <InputPrev styleForm={elementsStyles} element={element} />
            )}

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
