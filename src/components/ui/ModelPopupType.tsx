import React, { useState, useEffect } from "react";
import { Modal, Button, Divider } from "antd";
import { idGenerator, nameGenerator, newElement, renderOptions } from "@/utils/utilsFunctions";
import useDesigner from "@/hooks/useDesigner";
import { inputTypeOptions, selectTypeOptions } from "@/data/data";
import PreviewForm from "../forms/previews/PreviewForm";

export default function ModelPopupType({
  isModalVisible,
  setIsModalVisible,
}: {
  isModalVisible: boolean;
  setIsModalVisible: (isModalVisible: boolean) => void;
}) {
  const { elements, addElement, setIsEditFormCard } = useDesigner();
  const [selectedType, setSelectedType] = useState<ElementType>();
  const [previewElements, setPreviewElements] = useState<FormElement[]>([]);

  const handleOk = (type: ElementType) => {
    const newElementInstance = newElement(type);
    addElement(elements.length, newElementInstance);
    setIsModalVisible(false);
    setIsEditFormCard(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => { 
      const preview = renderOptions(selectedType as ElementType);
      setPreviewElements(preview);
    
  }, [selectedType]);

  return (
    <Modal
      title="Select Input Type"
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={() => {
            selectedType && handleOk(selectedType);
          }}
        >
          OK
        </Button>,
      ]}
    >
      <p>Select the input type</p>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-3 w-full items-center gap-2">
          {inputTypeOptions.map((option) => (
            <Button
              key={option.value}
              onClick={() => setSelectedType(option.value as ElementType)}
            >
              {option?.icon && React.createElement(option.icon)}
              {option.label}
            </Button>
          ))}
        </div>
        <p>Types with options</p>
        <div className="grid grid-cols-3 w-full items-center gap-2">
          {selectTypeOptions.map((option) => (
            <Button
              key={option.value}
              onClick={() => setSelectedType(option.value as ElementType)}
            >
              {option?.icon && React.createElement(option.icon)}
              {option.label}
            </Button>
          ))}
        </div>
      </div>
      {selectedType && (
     <>
      <Divider className="my-8 w-full h-0 border-2 " />
        <div className="mt-4">
          <p className="text-lg font-bold text-center m-4">Preview for : <span className="text-blue-500">{selectedType}</span></p>
      
          <PreviewForm isTemplate={true} elementsTemplate={previewElements} showSubmit = {true} />
        </div></>
      )}
    </Modal>
  );
}
