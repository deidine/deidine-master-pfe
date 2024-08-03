import { Button, Checkbox,  DatePicker,  Form,  Input, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import AutoResizeTextarea from "./AutoResizeTextarea";
import {  dateliment,  filetypealow, inputTypeOptions,  patternOptions,  selectTypeOptions} from "@/data/data";
import { DeleteFilled } from "@ant-design/icons";
import RequiredComponent from "./RequiredComponent";
import { AnimatePresence, motion } from "framer-motion";
import useDesigner from "@/hooks/useDesigner";
import moment from "moment";
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
    updateElement(element.name, { ...element, type: value, pattern: "" ,allowedEtentions:""});
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
          {(element.type === "select" ||
            element.type === "select_multiple" ||
            element.type === "radio" ||
            element.type === "checkbox") && (
            <SelectOptionSidBarOptions element={element} />
          )}
          <PatternSidBarOptions
            allowedPatternOptions={allowedPatternOptions}
            element={element}
          />
        </div>
        {element.type === "date" && <DateChoicePeriodInput  element={element} />}
        {element.type == "file" && <FileAllowedExtensions element={element} />}
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

const PatternSidBarOptions = ({
  element,
  allowedPatternOptions,
}: {
  element: SelectElement | InputElement;
  allowedPatternOptions: PatternType[];
}) => {
  const { updateElement } = useDesigner();

  const [customPattern, setCustomPattern] = useState(
    element.customPattern || ""
  );
  const [selectedPattern, setSelectedPattern] = useState<string>(
    element.pattern || ""
  );
  const patternSelectWrapperRef = useRef(null);
  const [allowedPatternOptionsState, setAllowedPatternOptionsState] = useState<
    PatternType[]
  >(allowedPatternOptions);
  const handleCustomPatternChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const pattern = e.target.value;
    setCustomPattern(pattern);
    updateElement(element.name, { ...element, customPattern: pattern });
  };
  const handlePatternChange = (value: string) => {
    const selectedOption = patternOptions.find(
      (option) => option.pattern === value
    );
    if (selectedOption && selectedOption.allowedTypes.includes(element.type)) {
      setSelectedPattern(value);
      updateElement(element.name, { ...element, pattern: value });
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
  }, [allowedPatternOptions]);

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
          {allowedPatternOptionsState.map((option) => (
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
            {
              allowedPatternOptionsState.find(
                (option) => option.pattern === selectedPattern
              )?.examplePattern
            }
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

function DateChoicePeriodInput({ element }: { element: any }) {
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);
  const [dates, setDates] = useState<{ [key: string]: string }>({
    start: "",
    end: "",
    current: "",
  });

  const handlePeriodChange = (checkedValues: string[]) => {
    setSelectedPeriods(checkedValues);
  };

  const handleDateChange = (date: moment.Moment | null, dateString: string, key: string) => {
    setDates({ ...dates, [key]: dateString });
    updateElementPattern(key, dateString);
  };

  const updateElementPattern = (key: string, dateString: string) => {
    if (key === "start") {
      element.pattern = `Start date: ${dateString}`;
    } else if (key === "end") {
      element.pattern = `End date: ${dateString}`;
    } else if (key === "current") {
      element.pattern = `Current date: ${dateString}`;
    }
  };

  return (
    <div>
      <div className="flex flex-col space-y-2">
        <Checkbox.Group onChange={handlePeriodChange}>
          <Checkbox value="start">Start</Checkbox>
          <Checkbox value="end">End</Checkbox>
          <Checkbox value="current">Current</Checkbox>
        </Checkbox.Group>
      </div>

      {selectedPeriods.includes("start") && (
        <Form.Item
          label="Start Date"
          name="startDate"
          style={{ marginTop: "10px" }}
          rules={[
            {
              required: true,
              message: "Start date is required",
            },
          ]}
        >
          <DatePicker
            placeholder="Select start date"
            style={{ width: "100%" }}
            format="YYYY-MM-DD"
            onChange={(date, dateString) => handleDateChange(date, dateString, "start")}
          />
        </Form.Item>
      )}

      {selectedPeriods.includes("end") && (
        <Form.Item
          label="End Date"
          name="endDate"
          style={{ marginTop: "10px" }}
          rules={[
            {
              required: true,
              message: "End date is required",
            },
          ]}
        >
          <DatePicker
            placeholder="Select end date"
            style={{ width: "100%" }}
            format="YYYY-MM-DD"
            onChange={(date, dateString) => handleDateChange(date, dateString, "end")}
          />
        </Form.Item>
      )}

      {selectedPeriods.includes("current") && (
        <Form.Item
          label="Current Date"
          name="currentDate"
          style={{ marginTop: "10px" }}
          rules={[
            {
              required: true,
              message: "Current date is required",
            },
          ]}
        >
          <DatePicker
            placeholder="Select current date"
            style={{ width: "100%" }}
            format="YYYY-MM-DD"
            onChange={(date, dateString) => handleDateChange(date, dateString, "current")}
          />
        </Form.Item>
      )}
    </div>
  );
}

function FileAllowedExtensions({
  element,
}: {
  element: SelectElement | InputElement;
}) {
  const [selectedFileTypes, setSelectedFileTypes] = useState<string[]>([]);
  const { updateElement } = useDesigner();

  useEffect(() => {
    if (element.allowedEtentions) {
      setSelectedFileTypes(element.allowedEtentions.split(", "));
    } else {
      setSelectedFileTypes([]);
    }
  }, [element.allowedEtentions]);

  const handleFileTypeChange = (selected: string[]) => {
    setSelectedFileTypes(selected);
    const updatedExtensions = selected.join(", ");
    updateElement(element.name, { ...element, allowedEtentions: updatedExtensions });

    if (!updatedExtensions) {
      setSelectedFileTypes([]);
    }
  };

  return (
    <div>
      <Select
        mode="multiple"
        placeholder={"Allowed file types"}
        style={{ width: "100%" }}
        onChange={handleFileTypeChange}
        value={selectedFileTypes}
      >
        {filetypealow.map((option: string, idx: number) => (
          <Select.Option key={idx} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}

