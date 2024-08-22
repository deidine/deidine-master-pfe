import Link from "next/link";
import React from "react";
import Image from "next/image"; // Import Image from next/image

export default function Hero() {
  return (
    <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] flex flex-col lg:flex-row justify-between items-start lg:pb-10">
      <div className="lg:w-1/2 w-full px-4 sm:px-6 md:px-8 lg:px-0">
        <p className="text-buttonColor font-bold text-lg sm:text-xl lg:text-2xl pb-4">
          Quick Form
        </p>

        <p className="text-black font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl w-full lg:w-[60%] py-4">
          The easiest way to create forms people love to fill out
        </p>

        <p className="w-full sm:w-[80%] md:w-[70%] lg:w-[85%] text-xs sm:text-sm md:text-base lg:text-lg">
          Create online forms in the simplest and quickest way possible.
          RapidForms offers the easiest and quickest way to create forms just
          the way you want them, so you can focus on what matters most. Layout
          alt 03 Ready-to-use templates Simplify your workflow and save time
          with pre-designed forms that are easy to use and customize.
        </p>
      </div>

      <div className="absolute hidden lg:block right-10 w-[300px] sm:w-[400px] md:w-[450px] lg:w-[500px] lg:h-[500px]">
        <Image src="/logo.jpg" alt="image" width={500} height={500} />
      </div>
    </div>
  );
}
