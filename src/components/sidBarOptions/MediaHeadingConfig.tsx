import React, { useState } from "react";
import { Input,   Divider } from "antd";
import { LabelValue } from "./LabelValue";
import useDesigner from "@/hooks/useDesigner"; 
import AutoResizeTextarea from "../ui/AutoResizeTextarea";

export default function MediaHeadingConfig({
  element,
}: {
  element?: InputElement | SelectElement;
}) {
  const { updateElement } = useDesigner();
  const [logoUrl, setLogoUrl] = useState(element!.imgLogoLink || "");
   const [headingText, setHeadingText] = useState(element!.label || "");
  const [headingTextTitle, setHeadingTextTitle] = useState(
    element!.headingTitle || ""
  );

  const handleLogoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogoUrl(e.target.value);
    updateElement(element!.name, { ...element!, imgLogoLink: e.target.value });
  };

   
  const handleHeadingTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHeadingText(e.target.value);
    updateElement(element!.name, { ...element!, label: e.target.value });
  };
  const handleHeadingTextTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHeadingTextTitle(e.target.value);
    updateElement(element!.name, { ...element!, headingTitle: e.target.value });
  };
  return (
    <div>
      {element!.type === "logo" && (
        <>
          <LabelValue value="Logo URL" />
          <Input
            placeholder="Enter logo URL"
            value={logoUrl}
            onChange={handleLogoUrlChange}
            className="mb-4"
          />
    
        </>
      )}

      {element!.type === "paragraph" && (
        <>
          <Divider />
          <LabelValue value="Titre Paragraph " />
   
          <AutoResizeTextarea
                  inputLabel={headingText}
                  handleLabelChange={handleHeadingTextChange}
                  isEditing={true}
                />
         
        </>
      )}

      {element!.type === "headingTitle" && (
        <>
          <Divider />
          <LabelValue value="Titre de l'en-tête" />
          <Input
            placeholder="Enter Titre du formulaire"
            value={headingTextTitle}
            onChange={handleHeadingTextTitleChange}
            className="mb-4"
          />
        </>
      )}
    </div>
  );
}
