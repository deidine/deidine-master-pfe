"use client";
import Link from "next/link"; 
import React from "react";
import Signout from "./Signout";
export default   function NavBar() {
  // const user={"id":"7d5ee29e-db0d-4bd0-a56f-896d7ad76240","aud":"authenticated","role":"authenticated","email":"cheigeurdeidine@gmail.com","email_confirmed_at":"2024-07-29T08:05:57.789465Z","phone":"","confirmation_sent_at":"2024-07-29T08:45:57.789465Z","confirmed_at":"2024-07-29T08:05:57.789465Z","last_sign_in_at":"2024-07-29T10:03:10.471009Z","app_metadata":{"provider":"email","providers":["email"]},"user_metadata":{"email":"cheigeurdeidine@gmail.com","email_verified":false,"phone_verified":false,"sub":"7d5ee29e-db0d-4bd0-a56f-896d7ad76240"},"identities":[{"identity_id":"207f14d6-56cc-4278-a6b2-c74b87eeb129","id":"7d5ee29e-db0d-4bd0-a56f-896d7ad76240","user_id":"7d5ee29e-db0d-4bd0-a56f-896d7ad76240","identity_data":{"email":"cheigeurdeidine@gmail.com","email_verified":false,"phone_verified":false,"sub":"7d5ee29e-db0d-4bd0-a56f-896d7ad76240"},"provider":"email","last_sign_in_at":"2024-07-29T08:45:57.767703Z","created_at":"2024-07-29T08:45:57.767763Z","updated_at":"2024-07-29T08:45:57.767763Z","email":"cheigeurdeidine@gmail.com"}],"created_at":"2024-07-29T08:45:57.751944Z","updated_at":"2024-07-29T10:03:10.474191Z","is_anonymous":false}
 const user=localStorage.getItem( "user")?JSON.parse(localStorage.getItem( "user")!):null
  return (
 
        <header className="bg-white rounded-lg border-2 h-20 ">
          <nav className="flex flex-row items-center my-auto mt-4 gap-4">
            <Link href="/">FormBiulder</Link> 
            <Link href="/forms">Dashboard</Link>
            <div className="flex gap-4 justify-end w-full">
            
            { <Link href="/login">{user ?<Signout/>:"Login"}</Link>}
          {user && user.email}
            </div>
          </nav>
        </header> 
  );
}
