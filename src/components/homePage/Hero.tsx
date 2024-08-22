import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image"; // Import Image from next/image

export default function Hero() {
  return (
    <div className="">
      <div className="flex flex-row justify-between items-start pb-10">
        <div className="wj-1/2">
      <p className=" text-buttonColor font-bold text-2xl pb-4">Quick Form</p>
       
            <span className="text-black font-bold text-xl">
              The easiest way to create forms people love to fill out
            </span>
          
          <p className="w-[50%]">
            Create online forms in the simplest and quickest way possible.
            RapidForms offers the easiest and quickest way to create forms just
            the way you want them, so you can focus on what matters most. Layout
            alt 03 Ready-to-use templates Simplify your workflow and save time
            with pre-designed forms that are easy to use and customize.
          </p>
        </div>
        <div className="w-[80%]">
          <Image src="/logo.jpg" alt="image" width={700} height={500} />
        </div>
      </div>
    </div>
  );
}
