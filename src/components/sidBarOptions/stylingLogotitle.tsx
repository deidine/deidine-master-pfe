import React, {   useState } from "react";
import { Radio } from "antd"; 
import useDesigner from "@/hooks/useDesigner"; 
import { LabelValue } from "./LabelValue";
export default function StylingLogotitle( ) {
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
  return (
    <div className="rounded-lg ursor-pointer   mb-4 p-4">
  <LabelValue value="Choisir la direction  du Logo avec Titre" />

        
        <Radio.Group onChange={handleLayoutChange} value={layout}>
          <div className="flex flex-col gap-3 pt-2">
          <div> <Radio value="row">Ligne</Radio></div> 
            <Radio value="col">Colonne</Radio>
          </div>
        </Radio.Group>
  
    </div>
  );
}
