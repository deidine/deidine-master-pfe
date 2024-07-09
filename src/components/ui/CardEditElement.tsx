import { CloseCircleOutlined, LeftCircleFilled } from "@ant-design/icons";
import { Button, Select } from "antd";
import { inputTypeOptions, patternOptions } from "@/data/data";
import { selectTypeOptions } from "@/data/data";
import { useState } from "react";
import RequiredComponent from "./RequiredComponent";
const { Option } = Select;

export default function CardEditElement  ({
    element,
    setElement,
  }: {
    element: SelectElement | InputElement;
    setElement: (value: SelectElement | InputElement) => void;
  }) {
    const [showTypeSelect, setShowTypeSelect] = useState(false);
    const [inputType, setInputType] = useState<ElementType>(element.type);
    const [isRequired, setIsRequired] = useState(element.required);
  
    const handleTypeChange = (value: ElementType) => {
      setInputType(value);
      setElement({ ...element, type: value });
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
          <Button
            className="w-1/2"
            icon={<LeftCircleFilled />}
            size="small"
            onClick={() => setShowTypeSelect(true)}
          >
            {element.type || "Select Element Type"}
          </Button>
        )}
        <RequiredComponent
          required={element.required!}
          toggleRequired={() => {
            setElement({ ...element, required: !isRequired });
            setIsRequired(!isRequired);
          }}
          isSwitchButton={false}     
        />
      </div>
    );
  };
  