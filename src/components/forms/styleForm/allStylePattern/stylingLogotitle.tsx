import React, { useEffect, useState } from "react";
import { Radio } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import useDesigner from "@/hooks/useDesigner";

export default function StylingLogotitle({
  currentStyling,
  currentSelected,
  trriger,
}: {
  currentSelected?: "Form" | "Elements" | "Buttons" | "Paragraph" | "LogoTitle";
  currentStyling: string;
  trriger: (
    value: "Form" | "Elements" | "Buttons" | "Paragraph" | "LogoTitle"
  ) => void;
}) {
  const { elements, setElements } = useDesigner();
  const [layout, setLayout] = useState<"row" | "col">(() => {
    const logoElement = elements.find((el) => el.elementType.type === "logo");
    const layoutValue = logoElement?.elementType.headingLogFlex;
    return layoutValue === "row" || layoutValue === "col" ? layoutValue : "row";
  });

  const handleLayoutChange = (e: any) => {
    const newValue: "row" | "col" = e.target.value;
    setLayout(newValue);
    setElements(
      elements.map((el) =>
        el.elementType.type === "logo"
          ? {
              ...el,
              elementType: {
                ...el.elementType,
                headingLogFlex: newValue,
              },
            }
          : el
      )
    );
  };

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(currentSelected === "LogoTitle");
  }, [currentSelected]);

  const toggleVisibility = () => {
    trriger("LogoTitle");
    setIsVisible(!isVisible);
  };

  return (
    <div
      className="rounded-lg hover:bg-hoverButtonColor cursor-pointer hover:text-white mb-4 p-4"
      >
      <div className="flex justify-between items-center cursor-pointer"
      onClick={toggleVisibility}>
        {currentStyling}{" "}
        {isVisible ? <UpOutlined /> : <DownOutlined />}
      </div>

      {isVisible && (
        <Radio.Group onChange={handleLayoutChange} value={layout}>
          <Radio value="row">Row</Radio>
          <Radio value="col">Column</Radio>
        </Radio.Group>
      )}
    </div>
  );
}
