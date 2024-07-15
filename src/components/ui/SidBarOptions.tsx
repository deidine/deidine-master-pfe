import { Button, Input, Select } from "antd";
import React, { useRef, useState } from "react";
import AutoResizeTextarea from "./AutoResizeTextarea";
import {
  inputTypeOptions,
  patternOptions,
  selectTypeOptions,
} from "@/data/data";
import { DeleteFilled } from "@ant-design/icons";
import RequiredComponent from "./RequiredComponent";
const { Option } = Select;

export default function SidBarOptions({
  element,
  setElement,
}: {
  element: SelectElement | InputElement;
  setElement: (value: SelectElement | InputElement) => void;
}) {
  const [placholder, setPlacholder] = useState(element.placeholder);
  const [inputLabel, setInputLabel] = useState(element.label);
  const [inputType, setInputType] = useState<ElementType>(element.type);
  const [isRequired, setIsRequired] = useState(element.required);

  const handleTypeChange = (value: ElementType) => {
    setInputType(value);
    setElement({ ...element, type: value });
  };
  const handleLabelChange = (e: any) => {
    setInputLabel(e.target.value);
    setElement({ ...element, label: e.target.value });
  };
  const handlePlaceholderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlacholder(e.target.value);
    setElement({ ...element, placeholder: e.target.value });
  };
  return (
    <div className="flex flex-col gap-2 h-auto">
      <div>
         
        <AutoResizeTextarea
          inputLabel={inputLabel}
          handleLabelChange={handleLabelChange}
          isEditing={true}
        />
      </div>

      <div>
     <LabelValue value="type"/>
        <Select
          className="w-full"
          value={inputType}
          onChange={handleTypeChange}
          placeholder="Select input type"
        >
          {
          element.type === "select" ||
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
      </div>
      <div>
        <RequiredComponent
          required={element.required!}
          toggleRequired={() => {
            setElement({ ...element, required: !isRequired });
            setIsRequired(!isRequired);
          }}
          isSwitchButton={true}
        />
      </div>
      <div>
      <LabelValue value="Placholder"/>
 
        <Input
          placeholder="placholder"
          value={placholder}
          onChange={handlePlaceholderChange}
          style={{ marginBottom: "8px" }}
        />
        {element.type === "select" ||
        element.type === "select_multiple" ||
        element.type === "radio" ||
        element.type === "checkbox" ? (
          <SelectElementSidBarOptions
            element={element}
            setElement={setElement}
          />
        ) : (
          <InputElementSidBarOptions
            element={element}
            setElement={setElement}
          />
        )}
      </div>
    </div>
  );
}

const SelectElementSidBarOptions = ({
  element,
  setElement,
}: {
  element: SelectElement | InputElement;
  setElement: (value: SelectElement | InputElement) => void;
}) => {
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>(
    element.pattern || []
  );
  const [newOption, setNewOption] = useState("");
  const [options, setOptions] = useState(element.options || []);
  const patternSelectWrapperRef = useRef(null);

  const addNewOption = () => {
    if (newOption.trim() !== "") {
      const updatedOptions = [...options, newOption];
      setOptions(updatedOptions);
      setElement({ ...element, options: updatedOptions });
      setNewOption("");
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
    setElement({ ...element, options: updatedOptions });
  };
  const removeOption = (index: number) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
    setElement({ ...element, options: updatedOptions });
  };
  return (
    <div className="flex flex-col">

<LabelValue value="Select Option"/>

      <div className="w-full mb-1 rounded-md border-2 p-2">
        {options.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <Input
              value={option}
              onPressEnter={addNewOption}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              style={{ marginRight: "8px" }}
            />
            <Button
              icon={<DeleteFilled className="hover:text-red-500" />}
              size="small"
              className="hover:text-red-500"
              onClick={() => removeOption(index)}
            />
          </div>
        ))}
        <div className="w-full mb-1">
          <Input
            placeholder="New option"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            style={{ marginBottom: "8px" }}
          />
          <Button className="w-full mb-1" onClick={addNewOption}>
            Add Option
          </Button>
        </div>
      </div>
    </div>
  );
};

const InputElementSidBarOptions = ({
  element,
  setElement,
}: {
  element: SelectElement | InputElement;
  setElement: (value: SelectElement | InputElement) => void;
}) => {
  const [customPattern, setCustomPattern] = useState(
    element.customPattern || ""
  );
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>(
    element.pattern || []
  );
  const [showPatternSelect, setShowPatternSelect] = useState(false);
  const patternSelectWrapperRef = useRef(null);

  const handleCustomPatternChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const pattern = e.target.value;
    setCustomPattern(pattern);
    setElement({ ...element, customPattern: pattern });
  };

  const handlePatternChange = (value: string[]) => {
    setSelectedPatterns(value);
    setElement({ ...element, pattern: value });
    if (value.length === 0) {
      setShowPatternSelect(false);
    }
  };

  return (

    <div className="flex flex-col gap-2">
       <LabelValue value="Pattern"/>

      <div className="w-full mb-1">
        <Select
          ref={patternSelectWrapperRef}
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Select patterns"
          value={selectedPatterns}
          onChange={handlePatternChange}
        >
          {patternOptions.map((option) => (
            <Option key={option.value} value={option.pattern}>
              {option.label}
            </Option>
          ))}
        </Select>
      </div>
      {selectedPatterns.includes(customPattern) && (
        <Input
          placeholder="Enter custom regex"
          value={customPattern}
          onChange={handleCustomPatternChange}
          className="mt-2"
        />
      )}
    </div>
  );
};



const LabelValue=({value}:{value:string})=>{
  return (
    <div className="my-2">  <label className="text-xl   leading-none    peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-normal flex-1 text-zinc-600">
    {value}: {"   "}
  </label></div>
  )
}
