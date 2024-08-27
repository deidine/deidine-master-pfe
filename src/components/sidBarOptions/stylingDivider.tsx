import React, { useState } from "react";
import { Slider } from "antd";
import useDesigner from "@/hooks/useDesigner";
import { LabelValue } from "./LabelValue";

export default function StylingDivider({element}:{element: SelectElement | InputElement;}) {
  const { elements, updateElement } = useDesigner();
  const [dividerHeight, setDividerHeight] = useState<number>(  element.heightDivider || 0 );

  const handleSliderChange = (value: number) => {
    setDividerHeight(value);
    updateElement(element.name, { ...element,    heightDivider: value });
 
  };

  return (
    <div className="rounded-lg cursor-pointer mb-4 p-4">
      <LabelValue value="Choisir la hauteur du diviseur" />
      <Slider
        max={200}
        value={dividerHeight}
        onChange={handleSliderChange}
      />
    </div>
  );
}
