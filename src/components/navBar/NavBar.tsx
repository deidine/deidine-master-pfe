"use client";
import useGeneral from "@/hooks/useGeneral";
import { createClientBrowser } from "@/utils/supabase/client";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { Menu } from '@headlessui/react';

export default function NavBar() {
  const { user, setUser } = useGeneral();
  const [showDropdown, setShowDropdown] = useState(false);

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
      window.location.reload();
    }
  };

  return (
    <header className="bg-white rounded-lg border-2 h-20">
      <nav className="flex flex-row items-center my-auto mt-4 gap-4">
        <Link href="/">FormBuilder</Link>
        <Link href="/forms">Dashboard</Link>
        <div className="flex gap-4 justify-end w-full">
          {user ? (
            <Menu as="div" className="relative inline-block text-right">
              <Menu.Button className=" mx-auto mt-2 w-48 ">
                <FaUserCircle className="text-2xl" />
                
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md 
              shadow-lg">
              <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } w-full text-left px-4 py-2 text-sm text-gray-700`}
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  
                   <span className="ml-2">{user.email}</span>
                   
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
