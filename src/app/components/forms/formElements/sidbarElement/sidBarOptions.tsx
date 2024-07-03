"use client";
import { Button, Input, Select } from "antd";
import React, { useRef, useState } from "react";
const { Option } = Select;

export default function SidBarOptions({
  element,
  setElement,
}: {
  element: SelectElement;
  setElement: (value: SelectElement) => void;
}) {
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>(
    element.pattern || []
  );
  const [selctPlacholder, setSelctPlacholder] = useState("select");
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
      <Input
        placeholder="Select"
        value={selctPlacholder}
        onChange={(e) => {
          setElement({ ...element, placeholder: selctPlacholder });
          setSelctPlacholder(e.target.value);
        }}
        style={{ marginBottom: "8px" }}
      />

      <div className="w-full mb-1 rounded-md border-2 p-2">
        {options.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <Input
              value={option}
              onPressEnter={addNewOption}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              style={{ marginRight: "8px" }}
            />
            <Button onClick={() => removeOption(index)}>Remove</Button>
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
}
