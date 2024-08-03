import { filetypealow } from "@/data/data";
import useDesigner from "@/hooks/useDesigner";
import { Button, Input, Select } from "antd";
import { useEffect, useRef, useState } from "react";

export function FileAllowedExtensions({
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
      updateElement(element.name, {
        ...element,
        allowedEtentions: updatedExtensions,
      });
  
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
  