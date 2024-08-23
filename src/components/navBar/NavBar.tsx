"use client";
import Image from "next/image";
import useGeneral from "@/hooks/useGeneral";
import { createClientBrowser } from "@/utils/supabase/client";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import React, { useEffect, useMemo, useState } from "react";
import { Divider, Popover } from "antd";
import { FiLogOut } from "react-icons/fi";

export default function NavBar() {
  const { user, setUser, isUserOnline } = useGeneral();
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/forms");

  // Memoize the user to avoid unnecessary re-renders
  const memoizedUser = useMemo(() => user, [user]);

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
      <header className="bg-white mt-0 pt-0 fixed top-0 w-full border-gray-300 shadow-sm z-40 border-b-2">
        <nav className="flex flex-row mt-0 w-full gap-4">
          <div className="pl-[0.8rem] py-[0.4rem] pr-[0.9rem]">
            <Link href="/">
              <Image
                src="/logo.jpg"
                alt="logo"
                width={50}
                height={50}
                className="rounded-full"
              />
            </Link>
          </div>
          <div className="flex flex-row  shrink-0  justify-between items-center">
            <div className="font-semibold text-black mt-[1rem] mx-[1rem]">
              <Link href="/forms">
                <div onClick={() => setActiveLink("/forms")}>
                  Formulaires
                  {activeLink === "/forms" && (
                    <span className="block h-1 mt-1 bg-buttonColor "></span>
                  )}
                </div>
              </Link>
            </div>
            <div className="font-semibold text-black  mt-[1rem] mx-[1rem]">
              {/* <Link href="/dashboard">
                <div onClick={() => setActiveLink("/dashboard")}>
                  Dashboard
                  {activeLink === "/dashboard" && (
                    <span className="block h-1 mt-1 bg-blue-500"></span>
                  )}
                </div>
              </Link> */}
            </div>
          </div>
          <div className="flex flex-grow justify-end items-center mr-4">
            {memoizedUser ? (
              <Popover
                content={
                  <div>
                    <button className=" font-semibold hover:bg-hoverButtonColor hover:text-white justify-evenly items-center gap-2 border rounded-lg w-full text-left px-4 py-2 text-sm text-gray-700">
                      {memoizedUser.email}
                    </button>
                    <Divider />
                    <button
                      className="flex flex-row font-semibold hover:bg-hoverButtonColor hover:text-white justify-evenly items-center gap-2 border rounded-lg w-full text-left px-4 py-2 text-sm text-gray-700"
                      onClick={handleSignOut}
                    >
                      <span>
                        <FiLogOut className="ml-2 " />
                      </span>{" "}
                      <span>Sign Out</span>
                    </button>
                  </div>
                }
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
                  <FaUserCircle className="text-[50px]  text-buttonColor " />
                </div>
              </Popover>
            ) : (
              <Link href="/login">
                {" "}
                <div className="bg-buttonColor cursor-pointer hover:bg-hoverButtonColor font-semibold text-white px-[2rem] py-[0.8rem] mr-[1.5rem] rounded-lg">
                  Login
                </div>
              </Link>
            )}
          </div>
        </nav>
      </header>
      <div className="mt-[60px]" />{" "}
      {/* Add margin to offset the fixed navbar */}
    </>
  );
}
