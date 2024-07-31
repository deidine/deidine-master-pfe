"use client"  
import React from 'react'  
import signout from './signout';
export default function Signout() {   
    const signOut =   () => {
     
      signout()
      };
  return (
    <div><button onClick={signOut}>Logout</button></div>
  )
}
