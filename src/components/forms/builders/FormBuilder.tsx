"use client";

import React, { useRef, useState } from "react";
import { Button } from "antd";
import {
  DragDropContext,
  Draggable,
  DragStart,
  Droppable,
} from "react-beautiful-dnd";
import useDesigner from "@/hooks/useDesigner";
import FormElement from "../formElements/FormElement";
import { motion } from "framer-motion";

export default function FormBuilder() {
  const [draggingElementIndex, setDraggingElementIndex] = useState<number | null>(null);
  const [destinationIndex, setDestinationIndex] = useState<number | null>(null);
  const constraintsRef = useRef(null);
  
  
  const {
    elements,
    setElements,
    submitBtn,
    setSubmitBtn,
    isEditFormCard,
    undo,
    redo,
    redoStack,undoStack
  } = useDesigner();

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
    <div className="max-w-2xl mt-3 border shadow rounded-xl w-1/2 h-auto p-10 ml-4">
      <Button onClick={undo} disabled={undoStack.length === 0}>
        Undo
      </Button>
      <Button onClick={redo} disabled={redoStack.length === 0}>
        Redo
      </Button>

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
                      <motion.div
                        dragConstraints={{ top: 0, bottom: 300 }}
                        ref={constraintsRef}
                      >
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
                            setElement={(value: SelectElement | InputElement) => {
                              const updatedElements = [...elements];
                              updatedElements[index].elementType = value;
                              setElements(updatedElements);
                            }}
                          />
                        </div>
                      </motion.div>

                      {destinationIndex === index && draggingElementIndex !== null && (
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
  );
}
