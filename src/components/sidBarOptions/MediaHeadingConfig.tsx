import React, { useState } from "react";
import { Input, Form, Divider } from "antd";
import { LabelValue } from "./LabelValue";
import useDesigner from "@/hooks/useDesigner";

export default function MediaHeadingConfig({
  element,
}: {
  element?: InputElement | SelectElement;
}) {
  const { updateElement } = useDesigner();
  const [logoUrl, setLogoUrl] = useState(element!.imgLogoLink || "");
  const [bannerUrl, setBannerUrl] = useState(element!.imgBannerLink || "");
  const [headingText, setHeadingText] = useState(element!.label || "");
  const [headingTextTitle, setHeadingTextTitle] = useState(
    element!.headingTitle || ""
  );

  const handleLogoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogoUrl(e.target.value);
    updateElement(element!.name, { ...element!, imgLogoLink: e.target.value });
  };

  const handleBannerUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBannerUrl(e.target.value);
    updateElement(element!.name, {
      ...element!,
      imgBannerLink: e.target.value,
    });
  };

  const handleHeadingTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

      {element!.type === "heading" && (
        <>
          <Divider />
          <LabelValue value="Heading Title" />
          <Input
            placeholder="Enter heading title"
            value={headingText}
            onChange={handleHeadingTextChange}
            className="mb-4"
          />
        </>
      )}

      {element!.type === "headingTitle" && (
        <>
          <Divider />
          <LabelValue value="Heading Title" />
          <Input
            placeholder="Enter Form title"
            value={headingTextTitle}
            onChange={handleHeadingTextTitleChange}
            className="mb-4"
          />
        </>
      )}
    </div>
  );
}
