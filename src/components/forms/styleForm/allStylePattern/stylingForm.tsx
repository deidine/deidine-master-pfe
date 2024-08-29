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
  const [bgColorPickerVisible, setBgColorPickerVisible] = useState(false);
  const { formStyle, setFormStyle } = useStyle();
  const [isVisible, setIsVisible] = useState(false);

 
  const handleSliderChange = (value: number, type: keyof FormStyle) => {
    const updatedStyles = { ...formStyle, [type]: `${value}px` };
    setFormStyle(updatedStyles);
  };

  const handleColorChange = (color: any, type: keyof FormStyle) => {
    const updatedStyles = { ...formStyle, [type]: color.hex };
    setFormStyle(updatedStyles);
  };

  useEffect(() => {
    if (currentSelected ===  "Form") {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [currentSelected]);

  const toggleVisibility = () => {
    trriger( "Form");
    setIsVisible(!isVisible);
  };

  return (
    <div
      className={`rounded-lg transition-all duration-300 hover:bg-gray-100 cursor-pointer mb-4 p-4 ${
        isVisible ? "bg-gray-50" : ""
      }`}
    >
      <div className="flex justify-between items-center" onClick={toggleVisibility}>
        {currentStyling}{" "}
        {isVisible && currentSelected === "Form" ? <UpOutlined /> : <DownOutlined />}
      </div>

      {isVisible && currentSelected === "Form" && (
        <div className="mt-4 space-y-4">
          <div
            className="relative"
            onClick={() => setBgColorPickerVisible(!bgColorPickerVisible)}
          >
            <Button>Couleur De Fond</Button>
            {bgColorPickerVisible && (
              <div className="absolute z-10">
                <SketchPicker
                  color={formStyle?.backgroundColor || "#fff"}
                  onChange={(color) => handleColorChange(color, "backgroundColor")}
                />
              </div>
            )}
          </div>

          <div
            className="relative"
            onClick={() => setColorPickerVisible(!colorPickerVisible)}
          >
            <Button>Couleur Du Texte</Button>
            {colorPickerVisible && (
              <div className="absolute z-10">
                <SketchPicker
                  color={formStyle?.color || "#000"}
                  onChange={(color) => handleColorChange(color, "color")}
                />
              </div>
            )}
          </div>

          <div>
            <label className="">Padding X:</label>
            <Slider
              max={200}
              value={parseInt(formStyle?.paddingX || "0", 10)}
              onChange={(value) => handleSliderChange(value, "paddingX")}
            />
          </div>

          <div>
            <label className="">Padding Y:</label>
            <Slider
              max={200}
              value={parseInt(formStyle?.paddingY || "0", 10)}
              onChange={(value) => handleSliderChange(value, "paddingY")}
            />
          </div>

          <div>
            <label className="">Border Width:</label>
            <Slider
              max={10}
              value={parseInt(formStyle?.borderWidth || "0", 10)}
              onChange={(value) => handleSliderChange(value, "borderWidth")}
            />
          </div>

          <div>
            <label className="">Border Radius:</label>
            <Slider
              max={50}
              value={parseInt(formStyle?.borderRadius || "0", 10)}
              onChange={(value) => handleSliderChange(value, "borderRadius")}
            />
          </div>
        </div>
      )}
    </div>
  );
}
