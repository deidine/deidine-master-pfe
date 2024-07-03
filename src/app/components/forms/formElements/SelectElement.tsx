import React, { useState, useRef } from "react";
import { Button, Select, Input } from "antd";
import { LeftCircleFilled } from "@ant-design/icons";
import useDesigner from "../../hooks/useDesigner";
import OptionPopUp from "../OptionPopUp";
import SidBarOptions from "./sidbarElement/sidBarOptions";

const { Option } = Select;

const SelectElement = ({
  element,
  setElement,
  index,
}: {
  index: number;
  element: SelectElement;
  setElement: (value: SelectElement) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // New state for sidebar visibility
  const [isRequired, setIsRequired] = useState(element.required);
  const [inputLabel, setInputLabel] = useState(element.label);
  const [showTypeSelect, setShowTypeSelect] = useState(false);
  const [inputType, setInputType] = useState(element.type);

  const { removeElement } = useDesigner();

  const editButtonRef = useRef<HTMLDivElement>(null);

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLabel(e.target.value);
    setElement({ ...element, label: e.target.value });
  };
  const handleTypeChange = (value: "select" | "radio" | "checkbox") => {
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

  return (
    <div
      key={index}
      ref={editButtonRef}
      className={`${
        isEditing ? "" : "hover:bg-slate-200"
      } flex flex-col relative justify-between w-full p-4 mb-2 border rounded shadow-sm group`}
    >
      <div className="flex flex-col">
        {isEditing ? (
          <>
            <div className="w-full mb-1"></div>
            <input
              className="font-semibold mb-2 outline-none"
              value={inputLabel}
              onChange={handleLabelChange}
            />
            <div className="flex flex-col w-auto gap-2">
              {showTypeSelect ? (
                <Select
                  style={{ width: "100%" }}
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
                  icon={<LeftCircleFilled />}
                  size="small"
                  onClick={() => setShowTypeSelect(true)}
                >
                  { element.type || "Select input type"}
                </Button>
              )}
              <Button size="small" onClick={() => setIsSidebarVisible(true)}>
                Open Sidebar
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col">
              <span className="font-semibold mb-2">{inputLabel}</span>
              <div className="flex flex-col w-auto items-start space-y-2">
                <div>
                  <Button size="small"> {element.type}</Button>
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
          isSelectElement={true}
          toggleIsMultiple={() => {
            setElement({ ...element, multiple: !element.multiple });
          }}
          isSelectMultiple={element.multiple}
        />
      </div>
      {isSidebarVisible && (
        <div
          className={`fixed top-0 right-0 w-full  h-full bg-black bg-opacity-50 z-50 overflow-auto transition-opacity duration-300 ease-in-out `}
 
          onClick={() => setIsSidebarVisible(false)}
        >
          <div
            className={`absolute top-0 right-0 w-64 h-full bg-white shadow-lg z-50 sidebar  `}
            style={{
              opacity: isSidebarVisible ? 1 : 0,
              transition : "opacity 9s ease-in-out",
            }}
               onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the sidebar
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
