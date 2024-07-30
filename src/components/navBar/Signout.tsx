"use client"
import { createClientBrowser } from '@/utils/supabase/client';
import React from 'react' 
export default function Signout() {  
    const supabase = createClientBrowser();
    const signOut = async () => {
        await supabase.auth.signOut();
       localStorage.clear();
      };
  return (
    <div><button onClick={signOut}>Logout</button></div>
  )
}
