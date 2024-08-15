import React, { useState } from "react";
import { Input, Form, Divider } from "antd";
import { LabelValue } from "./LabelValue";
import useDesigner from "@/hooks/useDesigner";

export default function MediaHeadingConfig({ element }: { element?: InputElement | SelectElement }) {
  const { updateElement } = useDesigner();
  const [logoUrl, setLogoUrl] = useState(element!.imgLogoLink || "");
  const [bannerUrl, setBannerUrl] = useState(element!.imgBannerLink || "");
  const [headingText, setHeadingText] = useState(element!.label || "");

  const handleLogoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogoUrl(e.target.value);
    updateElement(element!.name, { ...element!, imgLogoLink: e.target.value });
  };

  const handleBannerUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBannerUrl(e.target.value);
    updateElement(element!.name, { ...element!, imgBannerLink: e.target.value });
  };

  const handleHeadingTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeadingText(e.target.value);
    updateElement(element!.name, { ...element!, label: e.target.value });
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
      {element!.type === "banner" && (
        <>
          <Divider />
          <LabelValue value="Banner URL" />
          <Input
            placeholder="Enter banner URL"
            value={bannerUrl}
            onChange={handleBannerUrlChange}
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
    </div>
  );
}
