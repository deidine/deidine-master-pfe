import React, { useState, useRef } from "react";
import { Button, Select } from "antd";
import { LeftCircleFilled } from "@ant-design/icons";
import useDesigner from "../../hooks/useDesigner";
import OptionPopUp from "../../ui/OptionPopUp";
import SidBarOptions from "../../ui/SidBarOptions";
import RequiredComponent from "../../ui/RequiredComponent"; 
import AutoResizeTextarea from "../../ui/AutoResizeTextarea ";

const { Option } = Select;

const SelectElement = ({
  element,
  setElement,
  index,
}: {
  index: number;
  element: SelectElement;
  setElement: (value: SelectElement | InputElement) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [inputLabel, setInputLabel] = useState(element.label);
  const [showTypeSelect, setShowTypeSelect] = useState(false);
  const [inputType, setInputType] = useState(element.type);
  const [isRequired, setIsRequired] = useState(element.required);

  const { removeElement } = useDesigner();

  const editButtonRef = useRef<HTMLDivElement>(null);

  const handleLabelChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputLabel(e.target.value);
    setElement({ ...element, label: e.target.value });
  };

  const handleTypeChange = (value: SelectElementType) => {
    setInputType(value);
    setElement({ ...element, type: value });
    setShowTypeSelect(false);
  };

  const selectTypeOptions = [
    { value: "select", label: "Select" },
    { value: "select_multiple", label: "Select Multiple" },
    { value: "radio", label: "Radio" },
    { value: "checkbox", label: "Checkbox" },
  ];

  const handleDivClick = (e: React.MouseEvent) => {
   
    if (!isEditing) {
      setIsSidebarVisible(true);
    }
 
  };

  return (
    <div
      key={index}
      ref={editButtonRef}
      onClick={handleDivClick}
      className={`${
        isEditing ? "" : "hover:bg-slate-200"
      } flex flex-col relative justify-between w-full p-4 mb-2 border rounded shadow-sm group`}
    >
      <div className="flex flex-col">
        {isEditing ? (
          <>
            <div className="w-full mb-1"></div>
            <AutoResizeTextarea
              inputLabel={inputLabel}
              handleLabelChange={handleLabelChange}
              isEditing={isEditing}
            />

            <div className="flex flex-col lg:w-1/2 sm:w-full gap-2">
              {showTypeSelect ? (
                <Select
                  value={inputType}
                  onChange={handleTypeChange}
                  placeholder="Select input type"
                >
                  {selectTypeOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
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
                  {element.type || "Select input type"}
                </Button>
              )}
              <RequiredComponent
                required={element.required!}
                toggleRequired={() => {
                  setElement({ ...element, required: !isRequired });
                  setIsRequired(!isRequired);
                }}
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col ">
              <div className="font-semibold mb-2  ">{inputLabel}</div>
              <div className="flex flex-col w-auto items-start space-y-2">
                <div className="flex flex-col gap-2 w-auto items-start  ">
                  <Button size="small"> {element.type}</Button>
                  <Button size="small">
                    {element.required ? "Required" : "Not Required"}
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
        <OptionPopUp
          name={element.name}
          removeElement={(name: string) => {
            removeElement(name);
          }}
          isEditingSate={isEditing}
          setIsEditingState={(value: boolean) => {
            setIsEditing(value);
          }}
          toogleSidBar={(value: boolean) => setIsSidebarVisible(value)}
        />
      </div>
      {isSidebarVisible && (
        <div
          className={`fixed top-0 right-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto transition-all duration-300 ease-in-out`}
          onClick={() => setIsSidebarVisible(false)}
        >
          <div
            className={`absolute top-0 right-0 w-1/3 pl-3 h-full bg-white shadow-lg z-50 sidebar`}
            onClick={(e) => e.stopPropagation()}
          >
            <Button onClick={() => setIsSidebarVisible(false)}>Close</Button>
            <SidBarOptions element={element} setElement={setElement} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectElement;
