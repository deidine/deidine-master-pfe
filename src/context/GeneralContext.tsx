"use client";

import {  ReactNode , createContext, useState } from "react";
 
type GeneralContextType = {  
isQuestUser: boolean; 
setIsQuestUser:(value:boolean) => void;
};

export const GeneralContext = createContext<GeneralContextType | null>(null);

export default function GeneralContextProvider({ children }: { children: ReactNode }) {
 
const [isQuestUser, setIsQuestUser] = useState<boolean>(false);
 

  return (
    <GeneralContext.Provider
      value={{
        isQuestUser,
       
        setIsQuestUser 
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
}