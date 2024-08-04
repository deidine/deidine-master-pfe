import { filetypealow } from "@/data/data"; 
import {  Select } from "antd";
import { useEffect,useState } from "react";
import { LabelValue } from "./LabelValue";

export function FileAllowedExtensions({
    element,
  }: {
    element: SelectElement | InputElement;
  }) {
    const [selectedFileTypes, setSelectedFileTypes] = useState<string[]>([]);
 
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
      element.allowedEtentions = updatedExtensions; 
  
      if (!updatedExtensions) {
        setSelectedFileTypes([]);
      }
    };
  
    return (
      <div>
          <LabelValue value="File extensions" />

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
  