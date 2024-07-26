import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function NavBar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    // return redirect("/login");
  }
 
  return (
 
        <header className="bg-white rounded-lg border-2 h-20 ">
          <nav className="flex flex-row items-center my-auto mt-4 gap-4">
            <Link href="/">FormBiulder</Link> 
            <Link href="/forms">Dashboard</Link>
            <div className="flex gap-4 justify-end w-full">
            
            { <Link href="/login">{user ?"Login":"Signup"}</Link>}
           

            </div>
          </nav>
        </header> 
  );
}
