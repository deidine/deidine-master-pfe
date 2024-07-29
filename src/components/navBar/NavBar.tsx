"use client";
import Link from "next/link"; 
import React from "react";
import Signout from "./Signout";
export default   function NavBar() {
  const user=localStorage.getItem( "user")?JSON.parse(localStorage.getItem( "user")!):null
  return (
 
        <header className="bg-white rounded-lg border-2 h-20 ">
          <nav className="flex flex-row items-center my-auto mt-4 gap-4">
            <Link href="/">FormBiulder</Link> 
            <Link href="/forms">Dashboard</Link>
            <div className="flex gap-4 justify-end w-full">
            
            { <Link href="/login">{user ?<Signout/>:"Login"}</Link>}
            {user && user.email} {user && user.id}
            </div>
          </nav>
        </header> 
  );
}
