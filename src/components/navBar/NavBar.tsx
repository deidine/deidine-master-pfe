"use client";
import useGeneral from "@/hooks/useGeneral";
import Link from "next/link"; 
import React, { useEffect} from "react"; 
export default function NavBar() {
  const {user,setUser  } = useGeneral()
 
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
  if (typeof window !== 'undefined') {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href ="/login";
  }
};
  return (
    <header className="bg-white rounded-lg border-2 h-20">
      <nav className="flex flex-row items-center my-auto mt-4 gap-4">
        <Link href="/">FormBuilder</Link>
        <Link href="/forms">Dashboard</Link>
        <div className="flex gap-4 justify-end w-full">
         
            
              <span>{user && <>  <button onClick={handleSignOut}>Signout</button> {user.email}</>}</span>
          
            {!user &&<Link href="/login">Login</Link>}
         
        </div>
      </nav>
    </header>
  );
}
