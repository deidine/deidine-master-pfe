import React, { useState } from "react";
import { Radio, Slider } from "antd";
import useDesigner from "@/hooks/useDesigner";
import { LabelValue } from "./LabelValue";
export default function StylingLogotitle({
  element,
}: {
  element: SelectElement | InputElement;
}) {
  const { elements, setElements } = useDesigner();
  const [layout, setLayout] = useState<"row" | "col">(() => {
    const logoElement = elements.find((el) => el.elementType.type === "logo");
    const layoutValue = logoElement?.elementType.headingLogFlex;
    return layoutValue === "row" || layoutValue === "col" ? layoutValue : "row";
  });
  const { updateElement } = useDesigner();
  const [gapValue, setGapValue] = useState<number>(element.headingLogGap || 0);
  const [justifyValue, setJustifyValue] = useState<string>(
    element.headingLogJustify || "start"
  );

  const handleSliderChange = (value: number) => {
    setGapValue(value);
    updateElement(element.name, { ...element, headingLogGap: value });
  };

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
  const handleJustifyChange = (e: any) => {
    const newValue = e.target.value;
    updateElement(element.name, { ...element, headingLogJustify: newValue });

    setJustifyValue(newValue);
  };
  return (
    <div className="rounded-lg ursor-pointer   mb-4 p-4">
      <LabelValue value="Choisir la direction  du Logo avec Titre" />

      <div className="rounded-lg cursor-pointer mb-4 p-4">
        <Radio.Group onChange={handleLayoutChange} value={layout}>
          <div className="flex flex-col gap-3 pt-2">
            <div>
              {" "}
              <Radio value="row">Ligne</Radio>
            </div>
            <Radio value="col">Colonne</Radio>
          </div>
        </Radio.Group>
      </div>
      <LabelValue value="Choisir la hauteur du Gap" />
      <div className="rounded-lg cursor-pointer mb-4 p-4">
        <Slider max={200} value={gapValue} onChange={handleSliderChange} />
      </div>

      <LabelValue value="Choisir l'emplacement Logo / Titre" />
      <div className="rounded-lg cursor-pointer mb-4 p-4">
        <Radio.Group onChange={handleJustifyChange} value={justifyValue}>
          <div className="flex flex-col gap-3 pt-2">
            <div>
              {" "}
              <Radio value="center">milieu</Radio>
            </div>
            <Radio value="start">debut</Radio>
            <Radio value="end">fin</Radio>
          </div>
        </Radio.Group>
      </div>
    </div>
  );
}
