import { Button, Slider } from "antd";
import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import useStyle from "@/hooks/useStyle";

export default function StylingParagraph({ currentStyling }: { currentStyling: string }) {
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [bgColorPickerVisible, setBgColorPickerVisible] = useState(false);
  const { paragraphStyle,setParagraphStyle } = useStyle();
  const [isVisible, setIsVisible] = useState(false);

  const handleSliderChange = (value: number, type: keyof FormStyle) => {
    const updatedStyles = { ...paragraphStyle, [type]: `${value}px` };
    setParagraphStyle(updatedStyles);
  };

  const handleColorChange = (color: any, type: keyof FormStyle) => {
    const updatedStyles = { ...paragraphStyle, [type]: color.hex };
    setParagraphStyle(updatedStyles);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <div
        className="flex justify-between items-center border-b-2 cursor-pointer"
        onClick={toggleVisibility}
      >
        {currentStyling} {isVisible ? <UpOutlined /> : <DownOutlined />}
      </div>

      {isVisible && (
        <div className="mt-4 space-y-4">
          <div
            className="relative"
            onMouseEnter={() => setBgColorPickerVisible(true)}
            onMouseLeave={() => setBgColorPickerVisible(false)}
          >
            <Button>Background Color</Button>
            {bgColorPickerVisible && (
              <div className="absolute z-50">
                <SketchPicker
                  color={paragraphStyle?.backgroundColor || "#fff"}
                  onChange={(color) =>
                    handleColorChange(color, "backgroundColor")
                  }
                />
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setColorPickerVisible(true)}
            onMouseLeave={() => setColorPickerVisible(false)}
          >
            <Button>Text Color</Button>
            {colorPickerVisible && (
              <div className="absolute z-50">
                <SketchPicker
                  color={paragraphStyle?.color || "#000"}
                  onChange={(color) => handleColorChange(color, "color")}
                />
              </div>
            )}
          </div>

          <div>
            <label>Padding X:</label>
            <Slider
              max={200}
              value={parseInt(paragraphStyle?.paddingX || "0", 10)}
              onChange={(value) => handleSliderChange(value, "paddingX")}
            />
            <label>Padding Y:</label>
            <Slider
              max={200}
              value={parseInt(paragraphStyle?.paddingY || "0", 10)}
              onChange={(value) => handleSliderChange(value, "paddingY")}
            />
          </div>

          <div>
            <label>Border Width:</label>
            <Slider
              max={10}
              value={parseInt(paragraphStyle?.borderWidth || "0", 10)}
              onChange={(value) => handleSliderChange(value, "borderWidth")}
            />
          </div>

          <div>
            <label>Border Radius:</label>
            <Slider
              max={50}
              value={parseInt(paragraphStyle?.borderRadius || "0", 10)}
              onChange={(value) => handleSliderChange(value, "borderRadius")}
            />
          </div>
        </div>
      )}
    </div>
  );
}
