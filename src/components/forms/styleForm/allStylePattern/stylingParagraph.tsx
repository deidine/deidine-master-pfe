import { Button, Slider } from "antd";
import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import useStyle from "@/hooks/useStyle";

export default function Styling({
  currentStyling,
  currentSelected,
  trriger,
}: {
  currentSelected?: "Form" | "Elements" | "Buttons" | "Paragraph" | "Logo";
  currentStyling: string;
  trriger: (
    value: "Form" | "Elements" | "Buttons" | "Paragraph" | "Logo"
  ) => void;
}) { 
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const { paragraphStyle, setParagraphStyle } = useStyle();
  const [isVisible, setIsVisible] = useState(false);

  const handleSliderChange = (value: number, type: keyof FormStyle) => {
    const updatedStyles = { ...paragraphStyle, [type]: `${value}px` };
    setParagraphStyle(updatedStyles);
  };

  const handleColorChange = (color: any, type: keyof FormStyle) => {
    const updatedStyles = { ...paragraphStyle, [type]: color.hex };
    setParagraphStyle(updatedStyles);
  };

  useEffect(() => {
    if (currentSelected === "Paragraph") {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [currentSelected]);

  const toggleVisibility = () => {
    trriger("Paragraph");
    setIsVisible(!isVisible);
  };

  return (
    <div
      className={`rounded-lg transition-all duration-300 hover:bg-gray-100 cursor-pointer mb-4 p-4 ${
        isVisible ? "shadow-lg bg-gray-50" : ""
      }`}
    >
      <div className="flex justify-between items-center" onClick={toggleVisibility}>
        {currentStyling}{" "}
        {isVisible && currentSelected === "Paragraph" ? <UpOutlined /> : <DownOutlined />}
      </div>

      {isVisible && currentSelected === "Paragraph" && (
        <div className="mt-4 space-y-4">
   
          <div
            className="relative"
            onClick={() => setColorPickerVisible(!colorPickerVisible)}
          >
            <Button>Text Color</Button>
            {colorPickerVisible && (
              <div className="absolute z-10">
                <SketchPicker
                  color={paragraphStyle?.color || "#000"}
                  onChange={(color) => handleColorChange(color, "color")}
                />
              </div>
            )}
          </div>

          <div>
            <label className="font-semibold">Padding X:</label>
            <Slider
              max={200}
              value={parseInt(paragraphStyle?.paddingX || "0", 10)}
              onChange={(value) => handleSliderChange(value, "paddingX")}
            />
          </div>

          <div>
            <label className="font-semibold">Padding Y:</label>
            <Slider
              max={200}
              value={parseInt(paragraphStyle?.paddingY || "0", 10)}
              onChange={(value) => handleSliderChange(value, "paddingY")}
            />
          </div>

          <div>
            <label  className="font-semibold">Font Size:</label>
            <Slider
              max={200}
              value={parseInt(paragraphStyle?.borderRadius || "0", 10)}
              onChange={(value) => handleSliderChange(value, "borderRadius")}
            />
          </div>
          
        </div>
      )}
    </div>
  );
}
