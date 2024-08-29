import React from "react";

import { Button, Form } from "antd";
import SelectPrev from "@/components/forms/previews/elementTypePreview/SelectPrev";
import CheckBoxPrev from "@/components/forms/previews/elementTypePreview/CheckBoxPrev";
import DatePrev from "@/components/forms/previews/elementTypePreview/DatePrev";
import InputPrev from "@/components/forms/previews/elementTypePreview/InputPrev";
import RadioPrev from "@/components/forms/previews/elementTypePreview/RadioPrev";
import LogoPrev from "./elementTypePreview/LogoPrev";
import HeadingTitlePrev from "./elementTypePreview/HeadingPrevTitle";
import HeadingPrev from "./elementTypePreview/ParagraphPrev";
import { Separator } from "@/components/ui/separator";
export default function PreviewFormsTamplates({
  form,
  onFinish,
}: {
  form: Form;
  onFinish: (values: any) => void;
}) {
  const logoElement = form.content.find(
    (element) => element.elementType.type === "logo"
  );
  const HeadTitleElement = form.content.find(
    (element) => element.elementType.type === "headingTitle"
  );

  const getButtonStyles = () => {
    return {
      paddingLeft: form.buttonStyle?.paddingX,
      paddingRight: form.buttonStyle?.paddingX,
      paddingTop: form.buttonStyle?.paddingY,
      paddingBottom: form.buttonStyle?.paddingY,
      color: form.buttonStyle?.color,
      border: form.buttonStyle?.border,
      borderRadius: form.buttonStyle?.borderRadius,
      backgroundColor: form.buttonStyle?.backgroundColor,
    };
  };
  return (
   <div>
     <Form
      onFinish={onFinish}
      layout="vertical" // Set the layout to vertical
      className={
        "mt-3 flex flex-col  justify-center mx-auto bg-white border shadow rounded-xl w-1/2 h-auto p-10 "
      } 
    >
     {form.content.length  === 0 &&    <div className=" text-center p-10 w-full text-md font-title"> 
   
   Aucun élément n’a encore été ajouté 
    </div>} 
      
      <div
           style={{ gap: logoElement?.elementType
            .headingLogGap+"px",justifyContent: logoElement?.elementType.headingLogJustify!,alignItems: logoElement?.elementType.headingLogJustify!  }}
            className={`flex flex-${logoElement?.elementType
              .headingLogFlex!}  justify-start pb-2`}
          >
        {logoElement?.elementType.type === "logo" && (
          <LogoPrev element={logoElement} styleForm={form.style!} />
        )}
        {HeadTitleElement?.elementType.type === "headingTitle" && (
          <HeadingTitlePrev
            element={HeadTitleElement}
            styleForm={form.elementStyle}
          />
        )}
      </div>
      {form!.content.map((element: any, index) => (
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
            <InputPrev styleForm={form.elementStyle} element={element} />
          )}

          {["datetime-local", "date"].includes(element.elementType.type) && (
            <DatePrev styleForm={form.elementStyle} element={element} />
          )}
 {element.elementType.type === "divider" && (
<>              <Separator
              orientation="vertical"
              decorative
              className={` border-neutral-100   `}
              style={{height: element.elementType.heightDivider+"px"}}
              />
               </>
            )}
          {element.elementType.type === "time" && (
            <DatePrev
              styleForm={form.elementStyle}
              element={element}
              isTime={true}
            />
          )}

          {element.elementType.type === "select" && (
            <SelectPrev styleForm={form.elementStyle} element={element} />
          )}
          {element.elementType.type === "select_multiple" && (
            <SelectPrev
              styleForm={form.elementStyle}
              element={element}
              isMultiple={true}
            />
          )}
          {element.elementType.type === "checkbox" && (
            <CheckBoxPrev styleForm={form.elementStyle} element={element} />
          )}
          {element.elementType.type === "radio" && (
            <RadioPrev styleForm={form.elementStyle} element={element} />
          )}
          {element.elementType.type === "paragraph" && (
            <HeadingPrev   element={element}
            styleParagraph={form.paragraphStyle}/>
          )}
        </div>
      ))}
      <div className="flex justify-center pt-6">
        <Button
          type="primary"
          htmlType="submit"
          className="h-10 font-bold  w-1/2"
          style={getButtonStyles()}
        >
          submit
        </Button>
      </div>
    </Form>
   </div>
  );
}
