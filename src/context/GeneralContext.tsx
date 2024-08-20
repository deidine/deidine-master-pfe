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
  const [user, setUser] = useState<User | null>(userLocal);
  
  const [isUserOnline, setIsUserOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : null
  );
  
  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsUserOnline(navigator.onLine);
    };

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <GeneralContext.Provider
      value={{
        user: user ?? undefined,

        isUserOnline,
        setIsUserOnline,
        setUser,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
}
