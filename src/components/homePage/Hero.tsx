import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image"; // Import Image from next/image

export default function Hero() {
  return (
    <div>
      <div className="font-semibold w-20  text-black mt-[1rem] mx-[1rem]">
        <div>
          deidiend
          <span className="block h-1 mt-1 bg-buttonColor w-full "></span>
        </div>
      </div>
      <span className=" text-buttonColor font-bold text-2xl">Quick Form</span>
     
     <div   className="w-1/2"> 
      <div>
        <span className="text-black font-bold text-xl">
          The easiest way to create forms people love to fill out
        </span>
      </div>
      <p>
        Create online forms in the simplest and quickest way possible.
        RapidForms offers the easiest and quickest way to create forms just the
        way you want them, so you can focus on what matters most. Layout alt 03
        Ready-to-use templates Simplify your workflow and save time with
        pre-designed forms that are easy to use and customize.
      </p></div>
    </div>
  );
}
