"use client";
import React, { useEffect, useState } from "react";
import { Button, Modal, Select } from "antd";
import {
  DragDropContext,
  Draggable,
  DragStart,
  Droppable,
} from "react-beautiful-dnd";
import useDesigner from "@/hooks/useDesigner";
import FormElement from "../formElements/FormElement";
import { idGenerator, nameGenerator } from "@/utils/utilsFunctions";
const { Option } = Select;

export default function FormBuilder() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<ElementType>("text");
  const [draggingElementIndex, setDraggingElementIndex] = useState<
    number | null
  >(null);

  const [destinationIndex, setDestinationIndex] = useState<number | null>(null);
  const {
    elements,
    addElement,
    setElements,
    submitBtn,
    setSubmitBtn,
    setIsEditFormCard,
    isEditFormCard,
  } = useDesigner();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const newElement: FormElement = {
      elementType: {
        type: selectedType,
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
        ...(selectedType === "select" && { options: ["Option 1", "Option 2"] }),
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

  const handleOnDragEnd = (result: any) => {
    setDraggingElementIndex(null);
    setDestinationIndex(null);
    if (!result.destination) return;
    const items = Array.from(elements);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setElements(items);
  };
  const handleOnDragStart = (start: DragStart) => {
    setDraggingElementIndex(start.source.index);
  };
  const handleOnDragUpdate = (update: any) => {
    if (update.destination && typeof update.destination.index === "number") {
      setDestinationIndex(update.destination.index);
    } else {
      setDestinationIndex(null);
    }
  };

  return (
    <>
      <div className="max-w-2xl mt-3 border shadow rounded-xl w-1/2 h-auto p-10 ml-4">
        <DragDropContext
          onDragUpdate={handleOnDragUpdate}
          onDragStart={handleOnDragStart}
          onDragEnd={handleOnDragEnd}
        >
          <Droppable droppableId="data" type="COLUMN" direction="vertical">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {elements.map((element, index) => (
                  <Draggable
                    key={index}
                    draggableId={"" + index}
                    isDragDisabled={isEditFormCard}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <>
                        {" "}
                        <div
                          key={element.elementType.name}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`flex items-center justify-center group ${
                            draggingElementIndex === index ? " opacity-50" : ""
                          }`}
                        >
                          <FormElement
                            index={index}
                            element={element.elementType}
                            setElement={(
                              value: SelectElement | InputElement
                            ) => {
                              const updatedElements = [...elements];
                              updatedElements[index].elementType = value;
                              setElements(updatedElements);
                            }}
                          />
                        </div>
                        {destinationIndex === index &&
                          draggingElementIndex !== null && (
                            <div className="border-t-4 border-blue-100 mt-0 w-full h-4 mb-0"></div>
                          )}
                      </>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="flex justify-center pt-6">
            <Button className="h-10 font-bold py-2 px-4 w-1/2">
              <input
                type="text"
                className="outline-none bg-transparent w-full text-center"
                value={submitBtn}
                onChange={(e) => setSubmitBtn(e.target.value)}
              />
            </Button>
          </div>
        </DragDropContext>
      </div>
      <div className="pt-[4.5rem]"></div>
      <div className="shadow-sm w-1/2 h-auto border-2 ml-4 mt-2 rounded-lg">
        <div className="flex justify-center max-w-2xl mx-auto   border shadow rounded-xl">
          <Button 
            className="h-auto font-bold py-2 px-4 w-full"
            
          onClick={showModal}
          >
                     <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-plus w-5 h-5 text-zinc-500"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5v14"></path>
          </svg> Insert Element
          </Button>
        </div>
      </div>

      {/* Modal for selecting input type */}
      <Modal
        title="Select Input Type"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Select
          defaultValue="text"
          onChange={setSelectedType}
          className="w-full"
        >
          <Option value="text">Text</Option>
          <Option value="number">Number</Option>
          <Option value="password">Password</Option>
          <Option value="textarea">Textarea</Option>
          <Option value="select">Select</Option>
          {/* Add more options as needed */}
        </Select>
      </Modal>
    </>
  );
}
