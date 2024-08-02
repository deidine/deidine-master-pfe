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
import { AnimatePresence, motion } from "framer-motion";
import useDesigner from "@/hooks/useDesigner";
const { Option } = Select;

export default function SidBarOptions({
  element,
}: {
  element: SelectElement | InputElement;
}) {
  const [placholder, setPlacholder] = useState(element.placeholder);
  const [inputLabel, setInputLabel] = useState(element.label);
  const [inputType, setInputType] = useState<ElementType>(element.type);
  const [isRequired, setIsRequired] = useState(element.required);
  const { updateElement } = useDesigner();

  const handleTypeChange = (value: ElementType) => {
    setInputType(value); 
    updateElement(element.name, { ...element, type: value });
    updateElement(element.name, { ...element, pattern:"" });
  };
  const handleLabelChange = (e: any) => {
    setInputLabel(e.target.value);
    updateElement(element.name, { ...element, label: e.target.value });
  };
  const handlePlaceholderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlacholder(e.target.value);
    updateElement(element.name, { ...element, placeholder: e.target.value });
  };
  return (
    <AnimatePresence initial={true}>
      <motion.div
        key="modal"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
      >
        <div className="flex flex-col gap-2 h-auto">
          <div>
            <AutoResizeTextarea
              inputLabel={inputLabel}
              handleLabelChange={handleLabelChange}
              isEditing={true}
            />
          </div>

          <div>
            <LabelValue value="type" />
            <Select
              className="w-full"
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
          </div>
          <div>
            <RequiredComponent
              required={element.required!}
              toggleRequired={() => {
                updateElement(element.name, {
                  ...element,
                  required: !isRequired,
                });

                setIsRequired(!isRequired);
              }}
              isSwitchButton={true}
            />
          </div>
          <div>
            <LabelValue value="Placholder" />

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
              <SelectOptionSidBarOptions element={element} />
            ) : (
              <></>
            )}
            <PatternSidBarOptions element={element} />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

const SelectOptionSidBarOptions = ({
  element,
}: {
  element: SelectElement | InputElement;
}) => {
  const [selectedPatterns, setSelectedPatterns] = useState<string>(
    element.pattern || ""
  );
  const { updateElement } = useDesigner();

  const [newOption, setNewOption] = useState("");
  const [options, setOptions] = useState(element.options || []);
  const patternSelectWrapperRef = useRef(null);

  const addNewOption = () => {
    if (newOption.trim() !== "") {
      const updatedOptions = [...options, newOption];
      setOptions(updatedOptions);
      updateElement(element.name, { ...element, options: updatedOptions });

      setNewOption("");
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
    updateElement(element.name, { ...element, options: updatedOptions });
  };
  const removeOption = (index: number) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
    updateElement(element.name, { ...element, options: updatedOptions });
  };
  return (
    <div className="flex flex-col">
      <LabelValue value="Select Option" />

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
  
const PatternSidBarOptions  = ({ element }: {
  element: SelectElement | InputElement;
}) => {
  const { updateElement } = useDesigner();

  const [customPattern, setCustomPattern] = useState(element.customPattern || "");
  const [selectedPattern, setSelectedPattern] = useState<string>(element.pattern || "");
  const patternSelectWrapperRef = useRef(null);

  const handleCustomPatternChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pattern = e.target.value;
    setCustomPattern(pattern);
    updateElement(element.name, { ...element, customPattern: pattern });
  };

  const handlePatternChange = (value: string) => {
    const selectedOption = patternOptions.find(option => option.pattern === value);
    if (selectedOption && selectedOption.allowedTypes.includes(element.type)) {
      setSelectedPattern(value);
      updateElement(element.name, { ...element, pattern: value });
    } else {
      // Optionally, handle the case where the selected pattern is not allowed for the current input type
      console.warn(`Pattern not allowed for input type: ${element.type}`);
    }
  };

  const allowedPatternOptions = patternOptions.filter(option =>
    option.allowedTypes.includes(element.type)
  );

  return (
    <div className="flex flex-col gap-2">
      <LabelValue value="Pattern" />

      <div className="w-full mb-1">
        <Select
          ref={patternSelectWrapperRef}
          style={{ width: "100%" }}
          placeholder="Select patterns"
          value={selectedPattern}
          onChange={handlePatternChange}
        >
          {allowedPatternOptions.map(option => (
            <Option key={option.value} value={option.pattern}>
              {option.label}
            </Option>
          ))}
        </Select>
      </div>
      {selectedPattern && (
        <div className="mt-2">
          <LabelValue value="Example Pattern" />
          <div className="text-gray-600">
            {allowedPatternOptions.find(option => option.pattern === selectedPattern)?.examplePattern}
          </div>
        </div>
      )}
      {/* {selectedPattern.includes(customPattern) && (
        <Input
          placeholder="Enter custom regex"
          value={customPattern}
          onChange={handleCustomPatternChange}
          className="mt-2"
        />
      )} */}
    </div>
  );
}; 

const LabelValue = ({ value }: { value: string }) => {
  return (
    <div className="my-2">
      {" "}
      <label className="text-xl   leading-none    peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-normal flex-1 text-zinc-600">
        {value}: {"   "}
      </label>
    </div>
  );
};
