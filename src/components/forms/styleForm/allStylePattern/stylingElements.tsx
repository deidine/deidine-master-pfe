import { Button, Slider } from "antd";
import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import useStyle from "@/hooks/useStyle";
export default function Styling({ currentStyling,currentSelected ,trriger}: {
  currentSelected?:"Form" | "Elements" | "Buttons" | "Paragraph" | "LogoTitle";
 currentStyling: string;
 trriger:(value:"Form"|
 "Elements"|
 "Buttons"|
 "Paragraph" | "LogoTitle")=>void;
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
  useEffect(() => {
    // Ensure that the visibility is updated based on the currentSelected value
    if (currentSelected === "Elements") {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [currentSelected]);

  const toggleVisibility = () => {
    trriger("Elements") ;
     setIsVisible(!isVisible)  
  };

  return (
    <div className="rounded-lg  hover:bg-hoverButtonColor cursor-pointer hover:text-white   mb-4 p-4"
    
    onClick={toggleVisibility}
  >
      <div   
           className={`flex justify-between items-center   cursor-pointer`} 
      >
        {currentStyling} {isVisible && currentSelected=="Elements"  ? <UpOutlined /> : <DownOutlined />}
      </div>

      {isVisible  && currentSelected=="Elements" && (
        <div className="mt-4">
         
         
         <div
            className="relative" // Add relative positioning to parent div
                      onClick={() => setBgColorPickerVisible(!bgColorPickerVisible)}    >
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
                   onClick={() => setColorPickerVisible(!colorPickerVisible)}    >
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
