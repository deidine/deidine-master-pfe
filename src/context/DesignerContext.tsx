// DesignerContext.tsx
"use client";

import { Dispatch, ReactNode, SetStateAction, createContext, useRef, useState } from "react";

type DesignerContextType = {
  elements: FormElement[];
  setElements: Dispatch<SetStateAction<FormElement[]>>;
  addElement: (index: number, element: FormElement) => void;
  removeElement: (id: string) => void;
  setSubmitBtn: (value: string) => void;
  submitBtn: string;
  selectedElement: FormElement | null;
  setSelectedElement: Dispatch<SetStateAction<FormElement | null>>;
  isEditFormCard: boolean;
  setIsEditFormCard: (value: boolean) => void;
  updateElement: (id: string, element: FormElement) => void;
  undo: () => void;
  redo: () => void;
  redoStack: FormElement[][];
  undoStack: FormElement[][];
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({ children }: { children: ReactNode }) {
  const [elements, setElements] = useState<FormElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<FormElement | null>(null);
  const [submitBtn, setSubmitBtn] = useState<string>("Submit");
  const [isEditFormCard, setIsEditFormCard] = useState<boolean>(false);

  const undoStack = useRef<FormElement[][]>([]);
  const redoStack = useRef<FormElement[][]>([]);

  const addElement = (index: number, element: FormElement) => {
    setElements((prev) => {
      undoStack.current.push(prev);
      redoStack.current = [];
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const removeElement = (name: string) => {
    setElements((prev) => {
      undoStack.current.push(prev);
      redoStack.current = [];
      return prev.filter((element) => element.elementType.name !== name);
    });
  };

  const updateElement = (name: string, element: FormElement) => {
    setElements((prev) => {
      undoStack.current.push(prev);
      redoStack.current = [];
      const newElements = [...prev];
      const index = newElements.findIndex((el) => el.elementType.name === name);
      newElements[index] = element;
      return newElements;
    });
  };

  const undo = () => {
    setElements((prev) => {
      if (undoStack.current.length > 0) {
        redoStack.current.push(prev);
        return undoStack.current.pop() as FormElement[];
      }
      return prev;
    });
  };

  const redo = () => {
    setElements((prev) => {
      if (redoStack.current.length > 0) {
        undoStack.current.push(prev);
        return redoStack.current.pop() as FormElement[];
      }
      return prev;
    });
  };

  return (
    <DesignerContext.Provider
      value={{
        elements,
        isEditFormCard,
        submitBtn,
        setSubmitBtn,
        setElements,
        addElement,
        removeElement,
        setIsEditFormCard,
        selectedElement,
        setSelectedElement,
        updateElement,
        undo,
        redo,
        redoStack: redoStack.current,
        undoStack: undoStack.current,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}
