import { Button, Select } from "antd";
import { inputTypeOptions  } from "@/data/data";
import { selectTypeOptions } from "@/data/data";
import { useState } from "react";
import RequiredComponent from "../../../ui/RequiredComponent";
import useDesigner from "@/hooks/useDesigner";
const { Option } = Select;

export default function CardEditElement({
  element, 
}: {
  element: SelectElement | InputElement; 
}) {
  const [showTypeSelect, setShowTypeSelect] = useState(false);
  const [inputType, setInputType] = useState<ElementType>(element.type);
  const [isRequired, setIsRequired] = useState(element.required);
  const { updateElement } = useDesigner();
  const handleTypeChange = (value: ElementType) => {
    setInputType(value);
    updateElement(element.name, { ...element, type: value } );
    updateElement(element.name, { ...element, pattern: "" });

    setShowTypeSelect(false);
  };

  return (
    <div className="flex flex-col lg:w-1/2 sm:w-full gap-2">
    
      {showTypeSelect ? (
        <Select
          value={inputType}
          onChange={handleTypeChange}
          placeholder="Select input type"
        >
          {element.type === "select" ||
          element.type === "select_multiple" ||
          element.type === "radio" ||
          element.type === "checkbox"
            ? selectTypeOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))
            : inputTypeOptions.map((option, index) => (
                <Option key={index} value={option.value}>
                  {option.label}
                </Option>
              ))}
        </Select>
      ) : (
        <>
          {element.type === "select" ||
          element.type === "select_multiple" ||
          element.type === "radio" ||
          element.type === "checkbox" ? (
            <Button
              className="w-1/2"
              icon={selectTypeOptions
                .filter((option) => option.value === element.type)
                .map((option, index) => (
                  <option.icon key={index} className="h-4 w-4 inline-block mr-2" />
                ))}
              size="small"
              onClick={() => setShowTypeSelect(true)}
            >
              {element.type}
            </Button>
          ) : (
            <Button
              className="w-1/2"
              icon={inputTypeOptions
                .filter((option) => option.value === element.type)
                .map((option, index) => (
                  <option.icon key={index}  className="h-4 w-4 inline-block mr-2" />
                ))}
              size="small"
              onClick={() => setShowTypeSelect(true)}
            >
              {element.type}
            </Button>
          )}
        </>
      )}
      <RequiredComponent
        required={element.required!}
        toggleRequired={() => {
           updateElement(element.name, { ...element, required: !isRequired } ); 
       
          setIsRequired(!isRequired);
        }}
        isSwitchButton={false}
      />
    </div>
  );
}
