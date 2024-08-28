"use client";
import Image from "next/image";
import useGeneral from "@/hooks/useGeneral";
import { createClientBrowser } from "@/utils/supabase/client";
import Link from "next/link"; 
import { BiUser } from "react-icons/bi";
import React, { useEffect, useMemo, useState } from "react";
import { Divider, Popover } from "antd";
import { FiLogOut } from "react-icons/fi";
import { useTranslation } from "react-i18next";

import { languages } from "../../i18n/i18n";

export default function NavBar() {
  const { user, setUser, isUserOnline } = useGeneral();
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/forms");

  // Memoize the user to avoid unnecessary re-renders
  const memoizedUser = useMemo(() => user, [user]);

  const { i18n } = useTranslation();

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
  }, [setUser]);

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

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

  return (
    <>
      <header className="bg-white mt-0 pt-0 fixed top-0 w-full border-gray-200  z-40 border-b-[1px]">
        <nav className="flex flex-row mt-0 w-full gap-4">
          <div className="pl-[0.8rem] py-[0.4rem] pr-[0.9rem]">
            <Link className="flex justify-center items-center gap-2" href="/">
              <Image
                src="/logo.png"
                alt="logo"
                width={50}
                height={50}
                className="rounded-full"
              /> 
              <span className="text-buttonColor font-bold text-lg sm:text-xl lg:text-2xl pb-4">Quick Form</span>
            </Link>
          </div>
          {/* languae internalisation */}
          {/* {languages.map((l) => (
        <button
          key={l.code}
          onClick={() => i18n.changeLanguage(l.code)}
          className={`space-y-1 py-3 px-4 rounded-md bg-zinc-700 hover:bg-zinc-600 border-2  ${i18n.language === l.code ? "border-zinc-400" : "border-transparent"}`}
        >
          <div className="flex justify-between items-center">
            <div className="font-semibold">{l.native_name}</div>
            <div className="opacity-60">{l.code}</div>
          </div>
          <div className="text-start">{l.name} </div>
        </button>
      ))} */}
          <div className="flex flex-grow justify-end items-center mr-4">
            {memoizedUser ? (
              <>
                    <Link href="/forms">
                <div
                  className={`
                    ${
                      activeLink === "/forms"
                        ? "bg-buttonColor text-white border border-buttonColor"
                        : "bg-white text-buttonColor hover:text-white border border-gray-300"
                    } 
                     cursor-pointer
                     hover:bg-hoverButtonColor font-semibold
                    px-[2rem] py-[0.8rem] mr-[1.5rem] rounded-lg`}
                >
                    <div onClick={() => setActiveLink("/forms")}>
                      Formulaires
                    </div>
                </div>
                  </Link>
                <Popover
                  content={
                    <div>
                      <button className="font-semibold hover:bg-hoverButtonColor hover:text-white justify-evenly items-center gap-2 border rounded-lg w-full text-left px-4 py-2 text-sm text-gray-700">
                        {memoizedUser.email}
                      </button>
                      <Divider />
                      <button
                        className="flex flex-row font-semibold hover:bg-hoverButtonColor hover:text-white justify-evenly items-center gap-2 border rounded-lg w-full text-left px-4 py-2 text-sm text-gray-700"
                        onClick={handleSignOut}
                      >
                        <span>
                          <FiLogOut className="ml-2" />
                        </span>
                        <span>Se deconnecter</span>
                      </button>
                    </div>
                  }
                  trigger="click"
                  open={open}
                  onOpenChange={handleOpenChange}
                >
                  <div className="flex relative flex-col items-center gap-2 cursor-pointer">
                    <div
                      className={`w-2 h-2 absolute bottom-2 right-0 rounded-full p-1 ${
                        isUserOnline ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    <BiUser className="text-[50px] border-[1px] border-gray-300 rounded-full p-2 text-buttonColor" />
                  </div>
                </Popover>
              </>
            ) : (
              <>
                    <Link href="/forms">
                <div
                  className={`
                    ${
                      activeLink === "/forms"
                        ? "bg-buttonColor text-white hover:text-white border border-buttonColor"
                        : "bg-white text-buttonColor hover:text-white border border-gray-300"
                    } 
                     cursor-pointer
                     hover:bg-hoverButtonColor font-semibold
                    px-[2rem] py-[0.8rem] mr-[1.5rem] rounded-lg`}
                >
                    <div onClick={() => setActiveLink("/forms")}>
                      Formulaires
                    </div>
                </div>
                  </Link>
                <Link href="/login">
                  <div
                    className={`
                    ${
                      activeLink === "/login"
                        ? "bg-buttonColor text-white border border-buttonColor"
                        : "bg-white text-buttonColor border hover:text-white  border-gray-300"
                    } 
                     cursor-pointer
                     hover:bg-hoverButtonColor font-semibold
                    px-[2rem] py-[0.8rem] mr-[1.5rem] rounded-lg`}
                 
                    onClick={() => setActiveLink("/login")}>
                    Login
                  </div>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
      <div className="mt-[60px]" />
    </>
  );
}
