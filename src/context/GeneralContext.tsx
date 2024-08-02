"use client";

import { User } from "@supabase/supabase-js";
import { ReactNode, createContext, useEffect, useState } from "react";

type GeneralContextType = {
  user?: User;
  setUser: (value: User | null) => void;
  isUserOnline: boolean | null;
  setIsUserOnline: (value: boolean) => void;
};

export const GeneralContext = createContext<GeneralContextType | null>(null);

export default function GeneralContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const userLocal =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user")!)
      : null;
      const [user, setUser] = useState<User>(userLocal);

      
  const [isUserOnline, setIsUserOnline] = useState( typeof navigator !== "undefined" ? navigator.onLine : null);
  useEffect(() => {
    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOfflineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOfflineStatus);
    };
  }, [isUserOnline]);
 
  const handleOnlineStatus = () => {
    setIsUserOnline(true);
  };
  const handleOfflineStatus = () => {
    setIsUserOnline(false);
  };

  return (
    <GeneralContext.Provider
      value={{
        user,
        isUserOnline,
        setIsUserOnline,
        setUser: (value: User | null) => {
          setUser(value!);
        },
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
}
