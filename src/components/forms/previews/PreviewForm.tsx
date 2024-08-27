import React, { useState, useEffect } from "react";
import { Button, Form } from "antd";
import useDesigner from "@/hooks/useDesigner";
import InputPrev from "./elementTypePreview/InputPrev";
import DatePrev from "./elementTypePreview/DatePrev";
import SelectPrev from "./elementTypePreview/SelectPrev";
import CheckBoxPrev from "./elementTypePreview/CheckBoxPrev";
import RadioPrev from "./elementTypePreview/RadioPrev";
import useStyle from "@/hooks/useStyle";
import HeadingPrev from "./elementTypePreview/ParagraphPrev";
import LogoPrev from "./elementTypePreview/LogoPrev";
import HeadingTitlePrev from "./elementTypePreview/HeadingPrevTitle";
import { Separator } from "@/components/ui/separator";

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
  const { formStyle, elementStyle, buttonStyle, paragraphStyle } = useStyle();
  const { elements, submitBtn } = useDesigner();
  const mapElement = isTemlate ? elementsTemplatePreviw : elements;
  const logoElement = elements.find(
    (element) => element.elementType.type === "logo"
  );
  const HeadTitleElement = elements.find(
    (element) => element.elementType.type === "headingTitle"
  );

  const getFormStyles = () => {
    return isTemlate
      ? {}
      : {
          paddingLeft: formStyle?.paddingX,
          paddingRight: formStyle?.paddingX,
          paddingTop: formStyle?.paddingY,
          paddingBottom: formStyle?.paddingY,
          color: formStyle?.color,
          border: formStyle?.border,

          borderRadius: formStyle?.borderRadius,

          backgroundColor: formStyle?.backgroundColor,
        };
  };

  const getButtonStyles = () => {
    return {
      paddingLeft: buttonStyle?.paddingX,
      paddingRight: buttonStyle?.paddingX,
      paddingTop: buttonStyle?.paddingY,
      paddingBottom: buttonStyle?.paddingY,
      color: buttonStyle?.color,
      border: buttonStyle?.border,
      borderRadius: buttonStyle?.borderRadius,
      backgroundColor: buttonStyle?.backgroundColor,
    };
  };

  useEffect(() => {
    setElementsTemplatePreviw(elementsTemplate!);
  }, [elementsTemplate]);

  return (
    <>
      <Form
        onFinish={onFinish}
        layout="vertical"
        className={`${
          !isTemplate
            ? "max-w-2xl mt-3 bg-white mb-8  border shadow  w-1/2 h-auto p-10  "
            : " mb-8"
        }`}
        style={getFormStyles()}
      >
        {" "}
        {!isTemlate ? (
          <div
          style={{ gap: logoElement?.elementType
            .headingLogGap+"px",justifyContent: logoElement?.elementType.headingLogJustify! }}
            className={`flex flex-${logoElement?.elementType
              .headingLogFlex!}   pb-2`}
          >
        {logoElement?.elementType.type === "logo" && (
              <LogoPrev
                element={logoElement}
                styleForm={isTemlate ? {} : getFormStyles()}
              />
            )}
            {HeadTitleElement?.elementType.type === "headingTitle" && (
              <HeadingTitlePrev
                element={HeadTitleElement}
                styleForm={isTemlate ? {} : elementStyle}
              />
            )}
          </div>
        ) : (
          <></>
        )}
        <span className="text-md font-semibold">
          {mapElement.length === 0 && "Aucun élément n’a encore été ajouté"}
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
              <InputPrev
                styleForm={isTemlate ? {} : elementStyle}
                element={element}
              />
            )}

            {["datetime-local", "date"].includes(element.elementType.type) && (
              <DatePrev
                styleForm={isTemlate ? {} : elementStyle}
                element={element}
              />
            )}

            {element.elementType.type === "time" && (
              <DatePrev
                styleForm={isTemlate ? {} : elementStyle}
                element={element}
                isTime
              />
            )}

            {element.elementType.type === "select" && (
              <SelectPrev
                styleForm={isTemlate ? {} : elementStyle}
                element={element}
              />
            )}

            {element.elementType.type === "select_multiple" && (
              <SelectPrev
                styleForm={isTemlate ? {} : elementStyle}
                element={element}
                isMultiple
              />
            )}

            {element.elementType.type === "checkbox" && (
              <CheckBoxPrev
                styleForm={isTemlate ? {} : elementStyle}
                element={element}
              />
            )}

            {element.elementType.type === "radio" && (
              <RadioPrev
                styleForm={isTemlate ? {} : elementStyle}
                element={element}
              />
            )}
            {element.elementType.type === "paragraph" && (
              <HeadingPrev
                element={element}
                styleParagraph={isTemlate ? {} : paragraphStyle}
              />
            )}
                        {element.elementType.type === "divider" && (
              <><Separator
                orientation="vertical"
                decorative
                style={{ height: element.elementType.heightDivider + "px" }}
                className={` border-neutral-100   bg-red-500 `}
              />
            
              </>
            )}
          </div>
        ))}
        <div className="flex justify-center pt-6">
          {showSubmit ? (
            <Button
              type="primary"
              htmlType="submit"
              className="h-10 font-bold  w-1/2"
              style={getButtonStyles()}
            >
              {submitBtn}
            </Button>
          ) : null}
        </div>
      </Form>
    </>
  );
}
