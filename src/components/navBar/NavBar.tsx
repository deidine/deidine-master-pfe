"use client";
import Link from "next/link"; 
import React from "react";
import Signout from "./Signout";
import useGeneral from "@/hooks/useGeneral";
export default   function NavBar() {
  const user =localStorage.getItem( "user")?JSON.parse(localStorage.getItem( "user")!):null
  const { isQuestUser,  setUser } = useGeneral();
  // setUser(user2)
  return (
    <header className="bg-white rounded-lg border-2 h-20 ">
      <nav className="flex flex-row items-center my-auto mt-4 gap-4">
        <Link href="/">FormBiulder</Link>
        <Link href="/forms">Dashboard</Link>
        <div className="flex gap-4 justify-end w-full">
          {<Link href="/login">{user ? <Signout /> : "Login"}</Link>}
          {user && user.email}
          {isQuestUser ? " Form in localstorage" : " Form in database"}
        </div>
      </nav>
    </header>
  );
}
