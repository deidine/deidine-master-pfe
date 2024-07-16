import React, { useState } from "react";
import { Modal, Button } from "antd";
import { idGenerator, nameGenerator } from "@/utils/utilsFunctions";
import useDesigner from "@/hooks/useDesigner";

export default function ModelPopupType({
  isModalVisible,
  setIsModalVisible,
}: {
  isModalVisible: boolean;
  setIsModalVisible: (isModalVisible: boolean) => void;
}) {
  const { elements, addElement, setIsEditFormCard } = useDesigner();

  const handleOk = (type: ElementType) => {
    const newElement: FormElement = {
      elementType: {
        type: type,
        label: "Label",
        name: nameGenerator(),
        placeholder: "Enter your data",
        value: "",
        required: false,
        pattern: [],
        style: `h-10 text-sm focus-visible:outline-none focus-visible:ring-2
               focus-visible:bg-white border-zinc-200 duration-100 placeholder:text-zinc-400 ring-2 
               ring-transparent focus:bg-white focus-visible:ring-indigo-400 shadow-sm py-2 px-3 w-full
                rounded-lg border `,
        ...((type === "select" && {
          options: ["Option 1", "Option 2"],
        }) ||
          (type === "radio" && { options: ["Option 1", "Option 2"] }) ||
          (type === "checkbox" && {
            options: ["Option 1", "Option 2"],
          }) ||
          (type === "select_multiple" && {
            options: ["Option 1", "Option 2"],
          })),
      },
      id: idGenerator(),
    };
    addElement(elements.length, newElement);
    setIsModalVisible(false);
    setIsEditFormCard(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      title="Select Input Type"
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <p>Select the input type</p>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
        <Button onClick={() => handleOk("text")}>text</Button>
        <Button onClick={() => handleOk("email")}>email</Button>
        <Button onClick={() => handleOk("textarea")}>textarea</Button>
        <Button onClick={() => handleOk("number")}>number</Button>
        <Button onClick={() => handleOk("date")}>date</Button>
        <Button onClick={() => handleOk("time")}>time</Button>
        <Button onClick={() => handleOk("file")}>file</Button>
        <Button onClick={() => handleOk("password")}>password</Button>
        </div>
        <p>Types with options</p>
        <div className="flex flex-wrap gap-2">

        <Button onClick={() => handleOk("select_multiple")}>select_multiple</Button>
        <Button onClick={() => handleOk("select")}>select</Button>
        <Button onClick={() => handleOk("radio")}>radio</Button>
        <Button onClick={() => handleOk("checkbox")}>checkbox</Button>
      </div>
      </div>
    </Modal>
  );
}
