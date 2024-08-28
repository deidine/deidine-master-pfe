import React, { useEffect, useState } from "react";
import { Radio, Slider } from "antd";
import useDesigner from "@/hooks/useDesigner";
import { LabelValue } from "@/components/sidBarOptions/LabelValue";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

export default function StylingLogotitle({
  element,
  currentStyling,
  currentSelected,
  trriger,
}: {
  element: FormElement;
  currentSelected?: "Form" | "Elements" | "Buttons" | "Paragraph" | "Logo";
  currentStyling: string;
  trriger: (
    value: "Form" | "Elements" | "Buttons" | "Paragraph" | "Logo"
  ) => void;
}) {
  const { elements, setElements } = useDesigner();
  const [layout, setLayout] = useState<"row" | "col">(() => {
    const logoElement = elements.find((el) => el.elementType.type === "logo");
    const layoutValue = logoElement?.elementType.headingLogFlex;
    return layoutValue === "row" || layoutValue === "col" ? layoutValue : "row";
  });
  const { updateElement } = useDesigner();
  const [gapValue, setGapValue] = useState<number>(
    element.elementType.headingLogGap || 0
  );
  const [justifyValue, setJustifyValue] = useState<string>(
    element.elementType.headingLogJustify || "start"
  );
  const [isVisible, setIsVisible] = useState(false);

  const handleSliderChange = (value: number) => {
    setGapValue(value);
    updateElement(element.elementType.name, {
      ...element.elementType,
      headingLogGap: value,
    });
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
    updateElement(element.elementType.name, {
      ...element.elementType,
      headingLogJustify: newValue,
    });
    setJustifyValue(newValue);
  };

  useEffect(() => {
    if (currentSelected === "Logo") {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [currentSelected]);

  const toggleVisibility = () => {
    trriger("Logo");
    setIsVisible(!isVisible);
  };

  return (
    <div
      className={`rounded-lg transition-all duration-300 hover:bg-gray-100 cursor-pointer mb-4 p-4 ${
        isVisible ? "shadow-lg bg-gray-50" : ""
      }`}
    >
      <div
        className="flex justify-between items-center"
        onClick={toggleVisibility}
      >
        {currentStyling}{" "}
        {isVisible && currentSelected == "Logo" ? (
          <UpOutlined />
        ) : (
          <DownOutlined />
        )}
      </div>

      {isVisible && currentSelected == "Logo" && (
        <div className="mt-4 space-y-4">
        <div>
        <label className="font-semibold">Direction du Logo avec Titre:</label> <br />
          <Radio.Group onChange={handleLayoutChange} value={layout}>
            <div className="flex flex-col gap-3 pt-2">
              <Radio value="row">Ligne</Radio>
              <Radio value="col">Colonne</Radio>
            </div>
          </Radio.Group>

        </div>
         <div>
         <label className="font-semibold">Hauteur du Gap:</label><br />
          <Slider max={200} value={gapValue} onChange={handleSliderChange} />

         </div>
        <div>
        <label className="font-semibold">Emplacement du Logo / Titre:</label> <br />
          <Radio.Group onChange={handleJustifyChange} value={justifyValue}>
            <div className="flex flex-col gap-3 pt-2">
              <Radio value="start">Début</Radio>
              <Radio value="center">Milieu</Radio>
              <Radio value="end">Fin</Radio>
            </div>
          </Radio.Group>
        </div>
        </div>
      )}
    </div>
  );
}
