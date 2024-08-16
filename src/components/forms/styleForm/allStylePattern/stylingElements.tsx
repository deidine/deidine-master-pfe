import { Button, Slider } from "antd";
import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import useStyle from "@/hooks/useStyle";
export default function Styling({
  currentStyling,
}: {
  currentStyling: string;
}) {
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [bgColorPickerVisible, setBgColorPickerVisible] = useState(false);
  const { elementStyle, setElementStyle } = useStyle();

  const [isVisible, setIsVisible] = useState(false);

  const handleSliderChange = (value: number, type: keyof FormStyle) => {
    const updatedStyles = { ...elementStyle, [type]: `${value}px` };
    setElementStyle(updatedStyles);
  };

  const handleColorChange = (color: any, type: keyof FormStyle) => {
    const updatedStyles = { ...elementStyle, [type]: color.hex };
    setElementStyle(updatedStyles);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleVisibility}
      >
        {currentStyling} {isVisible ? <UpOutlined /> : <DownOutlined />}
      </div>

      {isVisible && (
        <div className="mt-4">
         
         
         <div
            className="relative" // Add relative positioning to parent div
            onMouseEnter={() => setBgColorPickerVisible(true)}
            onMouseLeave={() => setBgColorPickerVisible(false)}
          >
            {" "}
            {/* Add absolute positioning to picker */}
            <Button>Background Color</Button>
            {bgColorPickerVisible && (
              <div className="absolute z-10">
                {" "}
                <SketchPicker
                  color={elementStyle?.backgroundColor || "#fff"}
                  onChange={(color) =>
                    handleColorChange(color, "backgroundColor")
                  }
                />
              </div>
            )}
          </div>

          <div
            className="relative" // Add relative positioning to parent div
            onMouseEnter={() => setColorPickerVisible(true)}
            onMouseLeave={() => setColorPickerVisible(false)}
          >
            {" "}
            {/* Add absolute positioning to picker */}
            <Button>Text Color</Button>
            {colorPickerVisible && (
              <div className="absolute z-10">
                {" "}
                <SketchPicker
                  color={elementStyle?.color || "#000"}
                  onChange={(color) => handleColorChange(color, "color")}
                />
              </div>
            )}
          </div>
          <div>
            <label>Padding X:</label>
            <Slider
              max={200}
              value={parseInt(elementStyle?.paddingX || "0", 10)}
              onChange={(value) => handleSliderChange(value, "paddingX")}
            />
            <label>Padding Y:</label>
            <Slider
              max={200}
              value={parseInt(elementStyle?.paddingY || "0", 10)}
              onChange={(value) => handleSliderChange(value, "paddingY")}
            />
          </div>
          <div>
            <label>Border Width:</label>
            <Slider
              max={10}
              value={parseInt(elementStyle?.borderWidth || "0", 10)}
              onChange={(value) => handleSliderChange(value, "borderWidth")}
            />
          </div>

          <div>
            <label>Border Radius:</label>
            <Slider
              max={50}
              value={parseInt(elementStyle?.borderRadius || "0", 10)}
              onChange={(value) => handleSliderChange(value, "borderRadius")}
            />
          </div>

        </div>
      )}
    </div>
  );
}
