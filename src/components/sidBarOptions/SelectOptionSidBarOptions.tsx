import { DeleteFilled } from "@ant-design/icons";
import useDesigner from "@/hooks/useDesigner";
import { Button, Input } from "antd";
import { useRef, useState } from "react";
import { LabelValue } from "./LabelValue";

export const SelectOptionSidBarOptions = ({
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
              placeholder="Nouvelle option"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              style={{ marginBottom: "8px" }}
            />
            <Button className="w-full mb-1" onClick={addNewOption}>
              Ajouter un option
            </Button>
          </div>
        </div>
      </div>
    );
  };
  