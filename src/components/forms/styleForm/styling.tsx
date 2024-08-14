import { Button, Slider } from "antd";
import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
export default function Styling({
  form,
  handelStylingChanging,
  currentStyling,
}: {
  currentStyling: string;
  form?: Form;
  handelStylingChanging: (value: FormStyle | undefined) => void;
}) {
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [bgColorPickerVisible, setBgColorPickerVisible] = useState(false);
  const [formStyles, setFormStyles] = useState<FormStyle | undefined>(
    form?.style
  );
  const [isVisible, setIsVisible] = useState(false);

  const handleSliderChange = (value: number, type: keyof FormStyle) => {
    const updatedStyles = { ...formStyles, [type]: `${value}px` };
    setFormStyles(updatedStyles);
    handelStylingChanging(updatedStyles);
  };

  const handleColorChange = (color: any, type: keyof FormStyle) => {
    const updatedStyles = { ...formStyles, [type]: color.hex };
    setFormStyles(updatedStyles);
    handelStylingChanging(updatedStyles);
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
              value={parseInt(formStyles?.paddingX || "0", 10)}
              onChange={(value) => handleSliderChange(value, "paddingX")}
            />
            <label>Padding Y:</label>
            <Slider
              max={200}
              value={parseInt(formStyles?.paddingY || "0", 10)}
              onChange={(value) => handleSliderChange(value, "paddingY")}
            />
          </div>
          <div>
            <label>Border Width:</label>
            <Slider
              max={10}
              value={parseInt(formStyles?.borderWidth || "0", 10)}
              onChange={(value) => handleSliderChange(value, "borderWidth")}
            />
          </div>

          <div>
            <label>Border Radius:</label>
            <Slider
              max={50}
              value={parseInt(formStyles?.borderRadius || "0", 10)}
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
                color={formStyles?.backgroundColor || "#fff"}
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
                color={formStyles?.color || "#000"}
                onChange={(color) => handleColorChange(color, "color")}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
