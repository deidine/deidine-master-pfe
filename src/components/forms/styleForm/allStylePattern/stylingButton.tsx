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
  const {buttonStyle,setButtonStyle}=useStyle()
  const [isVisible, setIsVisible] = useState(false);

  const handleSliderChange = (value: number, type: keyof FormStyle) => {
    const updatedStyles = { ...buttonStyle, [type]: `${value}px` };
    setButtonStyle(updatedStyles); 
  };

  const handleColorChange = (color: any, type: keyof FormStyle) => {
    const updatedStyles = { ...buttonStyle, [type]: color.hex };
    setButtonStyle(updatedStyles); 
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <div onClick={toggleVisibility}>
        {currentStyling} {isVisible ? <UpOutlined /> : <DownOutlined />}
      </div>

      {isVisible && (
        <div className="mt-4">
          <div>
            <label>Padding X:</label>
            <Slider
              max={200}
              value={parseInt(buttonStyle?.paddingX || "0", 10)}
              onChange={(value) => handleSliderChange(value, "paddingX")}
            />
            <label>Padding Y:</label>
            <Slider
              max={200}
              value={parseInt(buttonStyle?.paddingY || "0", 10)}
              onChange={(value) => handleSliderChange(value, "paddingY")}
            />
          </div>
          <div>
            <label>Border Width:</label>
            <Slider
              max={10}
              value={parseInt(buttonStyle?.borderWidth || "0", 10)}
              onChange={(value) => handleSliderChange(value, "borderWidth")}
            />
          </div>

          <div>
            <label>Border Radius:</label>
            <Slider
              max={50}
              value={parseInt(buttonStyle?.borderRadius || "0", 10)}
              onChange={(value) => handleSliderChange(value, "borderRadius")}
            />
          </div>

          <div
            onMouseEnter={() => setBgColorPickerVisible(true)}
            onMouseLeave={() => setBgColorPickerVisible(false)}
          >
            <Button>Background Color</Button>
            {bgColorPickerVisible && (
              <SketchPicker
                color={buttonStyle?.backgroundColor || "#fff"}
                onChange={(color) =>
                  handleColorChange(color, "backgroundColor")
                }
              />
            )}
          </div>

          <div
            onMouseEnter={() => setColorPickerVisible(true)}
            onMouseLeave={() => setColorPickerVisible(false)}
          >
            <Button>Text Color</Button>
            {colorPickerVisible && (
              <SketchPicker
                color={buttonStyle?.color || "#000"}
                onChange={(color) => handleColorChange(color, "color")}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}