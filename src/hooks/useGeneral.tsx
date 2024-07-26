"use client";

import { useContext } from "react";
import { GeneralContext } from "@/context/GeneralContext";

function useGeneral() {
  const context = useContext(GeneralContext);

  if (!context) {
 
    throw new Error("useGeneral must be used within a GeneralContext");
  }

  return context;
}

export default useGeneral;
