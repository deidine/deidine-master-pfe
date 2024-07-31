"use client";

import { User } from "@supabase/supabase-js";
import {  ReactNode , createContext, useState } from "react";
 
type GeneralContextType = {   
user?:User;
setUser:(value:User|null) => void;
};

export const GeneralContext = createContext<GeneralContextType | null>(null);

export default function GeneralContextProvider({ children }: { children: ReactNode }) {
  const userLocal = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("user")!) : null;
  
const [ user, setUser ] = useState<User >(userLocal);
 
  return (
    <GeneralContext.Provider
      value={{ 
        user,
        setUser:(value:User|null)=>{setUser(value!)} 
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
}