"use client";
import useGeneral from "@/hooks/useGeneral";
import { createClientBrowser } from "@/utils/supabase/client";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { Popover } from "antd";

export default function NavBar() {
  const { user, setUser, isUserOnline } = useGeneral();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "user") {
        setUser(event.newValue ? JSON.parse(event.newValue) : null);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleSignOut = async () => {
    if (typeof window !== "undefined") {
      const supabase = createClientBrowser();
      await supabase.auth.signOut();
      localStorage.removeItem("user");
      setUser(null);
      window.location.href = "/forms";
    }
  };

 

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <>
      <header className="bg-white rounded-lg relative border-2">
        <nav className="flex flex-row mt-0 w-full gap-4">
          <div className="pl-[0.8rem] py-[0.4rem] pr-[0.9rem]">
            <Link href="/">
              <FaUserCircle className="text-[50px]" />
            </Link>
          </div>
          <div className="flex dw-[200px] shrink-0 flex-col justify-between items-center bg-blue-200">
            <div className="font-semibold text-white mt-[1rem] mx-[1rem]">
              <Link href="/forms">Forms</Link>
            </div>
            <span className="font-semibold bg-title w-[75%] h-2 mx-2"></span>
          </div>
          <div className="flex flex-grow justify-end items-center mr-4">
            {user ? (
              <Popover
                content={
                  <div>
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-gray-700"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </button>
                    <span className="ml-2">{user.email}</span>
                  
                  </div>
                }
                title="User Menu"
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
              >
                <div className="flex relative flex-col items-center gap-2 cursor-pointer">
                  <div
                    className={`w-2 h-2 absolute top-0 right-0 rounded-full ${
                      isUserOnline ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></div>
                  <FaUserCircle className="text-[50px]" />
                </div>
              </Popover>
            ) : (
              <div className="bg-black font-semibold text-white px-[2rem] py-[0.8rem] mr-[1.5rem] rounded-lg">
                <Link href="/login">Get Started</Link>
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
