import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import AutoResizeTextarea from "../ui/AutoResizeTextarea";
import {
  inputTypeOptions,
  patternOptions,
  selectTypeOptions,
} from "@/data/data";
import RequiredComponent from "../ui/RequiredComponent";
import { AnimatePresence, motion } from "framer-motion";
import useDesigner from "@/hooks/useDesigner";
import { DateChoicePeriodInput } from "./DateChoicePeriodInput";
import { FileAllowedExtensions } from "./FileAllowedExtensions";
import { LabelValue } from "./LabelValue";
import { PatternSidBarOptions } from "./PatternSidBarOptions";
import { SelectOptionSidBarOptions } from "./SelectOptionSidBarOptions";
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
  const [allowedPatternOptions, setAllowedPatternOptions] = useState(
    patternOptions.filter((option) =>
      option.allowedTypes.includes(element.type)
    )
  );
  const { updateElement } = useDesigner();
  const handleTypeChange = (value: ElementType) => {
    setInputType(value);
    updateElement(element.name, {
      ...element,
      type: value,
      pattern: "",
      allowedEtentions: "",
    });
  };

  const handleLabelChange = (e: any) => {
    setInputLabel(e.target.value);
    updateElement(element.name, { ...element, label: e.target.value });
  };
  const handlePlaceholderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlacholder(e.target.value);
    updateElement(element.name, { ...element, placeholder: e.target.value });
  };

  useEffect(() => {
    setAllowedPatternOptions(
      patternOptions.filter((option) => option.allowedTypes.includes(inputType))
    );
  }, [inputType]);

  return (
    <AnimatePresence initial={true}>
      <motion.div
        key="modal"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        className="space-y-6"
      >
        <div>
          <AutoResizeTextarea
            inputLabel={inputLabel}
            handleLabelChange={handleLabelChange}
            isEditing={true}
          />
        </div>

        <div>
          <LabelValue value="Type" />
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
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))
              : inputTypeOptions.map((option, index) => (
                  <Select.Option key={index} value={option.value}>
                    {option.label}
                  </Select.Option>
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
          <LabelValue value="Placeholder" />
          <Input
            placeholder="Placeholder"
            value={placholder}
            onChange={handlePlaceholderChange}
            className="mb-4"
          />
          {element.type === "select" ||
          element.type === "select_multiple" ||
          element.type === "radio" ||
          element.type === "checkbox" ? (
            <SelectOptionSidBarOptions element={element} />
          ) : element.type === "file" ||
            element.type === "date" ||
            element.type === "datetime-local" ||
            element.type === "time" ? (
            <> </>
          ) : (
            <></>
            // <PatternSidBarOptions
            //   allowedPatternOptions={allowedPatternOptions}
            //   element={element}
            // />
          )}
        </div>
        {element.type === "date" && <DateChoicePeriodInput element={element} />}
        {element.type == "file" && <FileAllowedExtensions element={element} />}
      </motion.div>
    </AnimatePresence>
  );
}
