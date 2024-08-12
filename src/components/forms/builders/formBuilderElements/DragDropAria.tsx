"use client";

 
import React, { useEffect, useRef, useState } from "react";
import { Droppable, Draggable, DragStart, DragDropContext } from 'react-beautiful-dnd'
import FormElement from './FormElement'
import useDesigner from '@/hooks/useDesigner';
export default function DragDropAria() {
 
  const [draggingElementIndex, setDraggingElementIndex] = useState<number | null>(null);
  const [destinationIndex, setDestinationIndex] = useState<number | null>(null);
  const {
        elements,
        setElements,  
        setSelectedElement,
        undoStack, 
        isEditFormCard
      } = useDesigner();
      
      const [isEditing, setIsEditing] = useState(isEditFormCard);
      const handleOnDragEnd = (result: any) => {
        setDraggingElementIndex(null);
        setDestinationIndex(null);
        if (!result.destination) return;
    
        const items = Array.from(elements);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
    
        // Push current state to undoStack before updating elements
        undoStack.push(elements);
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
    <DragDropContext
    onDragUpdate={handleOnDragUpdate}
    onDragStart={handleOnDragStart}
    onDragEnd={handleOnDragEnd}
  >
    <Droppable droppableId="data" type="COLUMN" direction="vertical">
    {(provided) => (
      <div ref={provided.innerRef} {...provided.droppableProps}>
        {/* {isEditing+""} */}
        {elements.map((element, index) => (
          <Draggable
            key={index}
            draggableId={"" + index}
            // isDragDisabled={isEditing  === "true" ? true : false}
            index={index}
          >
            {(provided, snapshot) => (
              <>
 
                  <div
                    key={element.elementType.name}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`flex items-center justify-center group ${
                      draggingElementIndex === index ? " opacity-50" : ""
                    }`}
                    onClick={() => setSelectedElement(element)}
                  >
                    <FormElement
                    form={element}
                      index={index}
                      element={element.elementType}
                    />
                  </div> 
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
   
      </DragDropContext>
  )
}
