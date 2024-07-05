import React, { useState, useRef, useEffect } from "react";
import { Button, Select, Input, Modal } from "antd";
import { CloseCircleOutlined,  LeftCircleFilled } from "@ant-design/icons";
import useDesigner from "../../hooks/useDesigner";
import OptionPopUp from "../../ui/OptionPopUp";
import RequiredComponent from "../../ui/RequiredComponent";
import SidBarOptions from "../../ui/SidBarOptions";
import { patternOptions } from "@/data/data";
import AutoResizeTextarea from "../../ui/AutoResizeTextarea ";

const { Option } = Select;

const InputElement = ({
  element,
  setElement,
  index,
}: {
  index: number;
  element: InputElement;
  setElement: (value: InputElement) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isRequired, setIsRequired] = useState(element.required);
  const [inputType, setInputType] = useState(element.type);
  const [inputLabel, setInputLabel] = useState(element.label); 
  const [showTypeSelect, setShowTypeSelect] = useState(false);
  const { removeElement, setIsEditFormCard } = useDesigner();
  const editButtonRef = useRef<HTMLDivElement>(null);
  const handleLabelChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputLabel(e.target.value);
    setElement({ ...element, label: e.target.value });
  };

  const handleTypeChange = (value: string) => {
    setInputType(value);
    setElement({ ...element, type: value });
    setShowTypeSelect(false);
  };

  const handleDivClick = (e: React.MouseEvent) => {
    if (!isEditing) {
      setIsEditFormCard(true);
      setIsSidebarVisible(true);
    }
  };

  const inputTypeOptions = [
    { value: "text", label: "Text" },
    { value: "number", label: "Number" },
    { value: "email", label: "Email" },
    { value: "password", label: "Password" },
    { value: "textarea", label: "Textarea" },
    { value: "hidden", label: "Hidden" },
  ];

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
           <AutoResizeTextarea
              inputLabel={inputLabel}
              handleLabelChange={handleLabelChange}
              isEditing={isEditing}
            />
          </>
        ) : (
          <>
            <div className="flex flex-col ">
            <div className=" p-2 w-full h-auto overflow-hidden">
                  {element.label}
                  </div>
              <div className="flex flex-col w-auto items-start space-y-2">
                <div className="flex flex-col gap-2 w-auto items-start  ">
                  <Button size="small"> {element.type}</Button>
                  {element.pattern!.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      <Button size="small">
                        {element.required ? "Required" : "Not Required"}
                      </Button>
                      {patternOptions.map(
                        (option, index) =>
                          option.value !== "" &&
                        element.pattern!.includes(option.pattern!) && (
                            <Button key={index} size="small">
                              {option.label}
                            </Button>
                          )
                      )}
                    </div>
                  ) : (
                    <Button size="small">
                      {element.required ? "Required" : "Not Required"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        <OptionPopUp
          name={element.name}
          removeElement={function (name: string): void {
            removeElement(name);
          }}
          isEditingSate={isEditing}
          setIsEditingState={function (value: boolean): void {
            setIsEditing(value);
            
          }}
          toogleSidBar={(value: boolean) => setIsSidebarVisible(value)}
        />
        {isEditing && (
          <>
            <div className="flex flex-col lg:w-1/2 sm:w-full gap-2">
              <RequiredComponent
                required={element.required!}
                toggleRequired={function (): void {
                  setElement({ ...element, required: !isRequired });
                  setIsRequired(!isRequired);
                }}
              />
              {showTypeSelect ? (
                <Select
                  value={inputType}
                  onChange={handleTypeChange}
                  placeholder="Select input type"
                >
                  {inputTypeOptions.map((option, index) => (
                    <Option key={index} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              ) : (
                <Button
                  icon={<LeftCircleFilled />}
                  size="small"
                  className="w-1/2"
                  onClick={() => setShowTypeSelect(true)}
                >
                  {element.type || "Select input type"}
                </Button>
              )}
            </div>
          </>
        )}
      </div>
      {isSidebarVisible && (
        <div
          className={`fixed top-0 right-0 w-full  h-full bg-black bg-opacity-50 z-50 overflow-auto transition-all duration-300 ease-in-out `}
          onClick={() =>           { setIsEditFormCard(false); setIsSidebarVisible(false)}}
        >
          <div
            className={`absolute top-0 right-0 w-1/3 pl-3 h-full bg-white shadow-lg z-50 sidebar  `}
            onClick={(e) => e.stopPropagation()}
          >
          
          <Button
           
              onClick={() => {
                setIsSidebarVisible(false);
                setIsEditFormCard(false);
              }}
              icon={<CloseCircleOutlined />}
            />
            <SidBarOptions
              element={element}
              setElement={(value: any) => {
                setElement(value);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InputElement;

  // const patternSelectWrapperRef = useRef(null);
  // const typeSelectWrapperRef = useRef(null); 
  // useEffect(() => {
  //   const handleOutsideClick = (event: MouseEvent) => {
  //     if (
  //       editButtonRef.current &&
  //       !editButtonRef.current.contains(event.target as Node) ||
  //       !patternSelectWrapperRef.current ||
  //       !typeSelectWrapperRef.current
  //     ) {
  //       setIsEditing(false);
  //     }
  //   };
  
  //   window.addEventListener("mousedown", handleOutsideClick);
  
  //   return () => {
  //     window.removeEventListener("mousedown", handleOutsideClick);
  //   };
  // }, []);