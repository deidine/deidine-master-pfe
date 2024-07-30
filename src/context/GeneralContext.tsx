"use client";

import { User } from "@supabase/supabase-js";
import {  ReactNode , createContext, useState } from "react";
 
type GeneralContextType = {   
user?:User;
setUser:(value:User) => void;
};

export const GeneralContext = createContext<GeneralContextType | null>(null);

export default function GeneralContextProvider({ children }: { children: ReactNode }) {
  
const [ user, setUser ] = useState<User >();

  return (
    <GeneralContext.Provider
      value={{ 
        user,
        setUser 
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
}