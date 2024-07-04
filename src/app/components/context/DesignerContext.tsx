"use client";

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
 
type DesignerContextType = {
  elements: FormElement[];
  setElements: Dispatch<SetStateAction<FormElement[]>>;
  addElement: (index: number, element: FormElement) => void;
  removeElement: (id: string) => void;
  setSubmitBtn:(value:string) => void;
  submitBtn: string;
  selectedElement: FormElement | null;
  setSelectedElement: Dispatch<SetStateAction<FormElement | null>>;
isEditFormCard: boolean;
setIsEditFormCard:(value:boolean) => void;
  updateElement: (id: string, element: FormElement) => void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({ children }: { children: ReactNode }) {
  const [elements, setElements] = useState<FormElement[]>([ ]);
  const [selectedElement, setSelectedElement] = useState<FormElement | null>(null);
const [submitBtn, setSubmitBtn] = useState<string>("Submit");
const [isEditFormCard, setIsEditFormCard] = useState<boolean>(false);
  const addElement = (index: number, element: FormElement) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const removeElement = (name: string) => {
    setElements((prev) => prev.filter((element) => element.elementType.name !== name));
  };

  const updateElement = (name: string, element: FormElement) => {
    setElements((prev) => {
      const newElements = [...prev];
      const index = newElements.findIndex((el) => el.elementType.name === name);
      newElements[index] = element;
      return newElements;
    });
  };

  return (
    <DesignerContext.Provider
      value={{
        elements,isEditFormCard,
        submitBtn,
        setSubmitBtn,
        setElements,
        addElement,
        removeElement,
        setIsEditFormCard,
        selectedElement,
        setSelectedElement,

        updateElement,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}