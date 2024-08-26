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
  const [layout, setLayout] = useState<"row" | "col">("row");
const {elements, setElements}=useDesigner()
  const handleLayoutChange = (e: any) => {
    setLayout(e.target.value);
    setElements(elements.map((el) => (el.elementType.type === "logo" ? { ...el,
       elementType: { ...el.elementType, headingLogFlex: e.target.value } } : el)))
  };  
  const [isVisible, setIsVisible] = useState(false);
 
   
  useEffect(() => {
    // Ensure that the visibility is updated based on the currentSelected value
    if (currentSelected === "LogoTitle") {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [currentSelected]);

  const toggleVisibility = () => {
    trriger("LogoTitle")  
    setIsVisible(!isVisible)  
  };

  return (
    <div className="rounded-lg  hover:bg-hoverButtonColor cursor-pointer hover:text-white   mb-4 p-4"
    
    onClick={toggleVisibility}
  >
        <div
        className={`flex justify-between items-center cursor-pointer`} 
      >
        {currentStyling}{" "}
        {isVisible && currentSelected === "LogoTitle" ? (
          <UpOutlined />
        ) : (
          <DownOutlined />
        )}
      </div>

      {isVisible && currentSelected === "LogoTitle" && (
        
        <Radio.Group onChange={handleLayoutChange} value={layout}>
        <Radio value="row">Row</Radio>
        <Radio value="col">Column</Radio>
      </Radio.Group>
       
  )}
    </div>
  );
}
