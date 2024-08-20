import { Input, Select } from "antd";
import { useEffect, useRef, useState } from "react";
import { LabelValue } from "./LabelValue";
import { patternOptions } from "@/data/data";
const { Option } = Select;

export const PatternSidBarOptions = ({
    element,
    allowedPatternOptions,
  }: {
    element: SelectElement | InputElement;
    allowedPatternOptions: PatternType[];
  }) => { 
 
    const [selectedPattern, setSelectedPattern] = useState<string>(
      element.pattern || ""
    );
    const patternSelectWrapperRef = useRef(null);
    const [allowedPatternOptionsState, setAllowedPatternOptionsState] = useState<
      PatternType[]
    >(allowedPatternOptions);
 
    const handlePatternChange = (value: string) => {
      const selectedOption = patternOptions.find(
        (option) => option.pattern === value
      );
      if (selectedOption && selectedOption.allowedTypes.includes(element.type)) {
        element.pattern = value;
        setSelectedPattern(value);
      } else {
        // Optionally, handle the case where the selected pattern is not allowed for the current input type
        console.warn(`Pattern not allowed for input type: ${element.type}`);
      }
    };
    
    useEffect(() => {
      setAllowedPatternOptionsState(
        patternOptions.filter((option) =>
          option.allowedTypes.includes(element.type)
        )
      );
      setSelectedPattern("");
    }, [allowedPatternOptions, element.type]); // Include element.type in the dependency array
  
    return (
      <div className="flex flex-col gap-2">
        <LabelValue value={`${selectedPattern ? "Pattern Example" : "Pattern"}`} />
        {selectedPattern && (
          <div>
            <div className="text-gray-600">
              {
                allowedPatternOptionsState.find(
                  (option) => option.pattern === selectedPattern
                )?.examplePattern
              }
            </div>
          </div>
        )}
        <div className="w-full mb-1">
          <Select
            ref={patternSelectWrapperRef}
            style={{ width: "100%" }}
            placeholder="Select patterns"
            value={element.pattern ? element.pattern : undefined}
            onChange={handlePatternChange}
          >
            {allowedPatternOptionsState.map((option) => (
              <Option key={option.value} value={option.pattern}>
                {option.label}
              </Option>
            ))}
          </Select>
        </div>
      </div>
    );
};
