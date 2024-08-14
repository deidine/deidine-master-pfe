"use client";

import { StyleContext } from "@/context/StyleContex";
import { useContext } from "react"; 

function useGeneral() {
  const context = useContext(StyleContext);

  if (!context) {
 
    throw new Error("useGeneral must be used within a StyleContext");
  }

  return context;
}

export default useGeneral;
