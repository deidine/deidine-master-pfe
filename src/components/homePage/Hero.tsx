import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image"; // Import Image from next/image

export default function Hero() {
  const [search, setSearch] = useState(false);
  const [nav, setNav] = useState(false);
  const Search = () => setSearch(true);
  const Hide = () => setSearch(false);
  const handleClick = () => setNav(!nav);

  return (
    <div className="h-[90vh] w-full px-16 py-14 bg-slate-300 rounded-3xl drop-shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between gap-2">
          <Image
            src="/logo.jpg" // Use the Image component from next/image
            alt="logo"
            width={50} // Set the width according to your design
            height={50} // Set the height according to your design
            className="rounded-full" // Use only necessary classes
          />
          <h1 className="text-4xl">Form Builder</h1>
        </div>

        <div>
          <ul className="hidden md:flex items-center">
            <li className="mx-4 md:mx-2 lg:text-lg">
              <Link href="/">Home</Link>
            </li>
            <li className="mx-4 md:mx-2 lg:text-lg">
              <Link href="/forms">Forms</Link>
            </li>
            <li className="mx-4 md:mx-2 lg:text-lg">
              <a href="#about">About</a>
            </li>
            <li className="mx-4 md:mx-2 lg:text-lg">
              <a href="#documentation">Documentation</a>
            </li>
            <li className="mx-4">
              <div className="w-7" onClick={Search} />
            </li>
          </ul>
        </div>

        <div className="hidden md:flex">
          <Link href="/login">
            <button className="lg:px-8 lg:py-2 rounded-md md:mx-2 md:px-2 md:py-1 lg:text-lg md:text-sm">
              Login
            </button>
          </Link>
          <Link href="/login">
            <button className="border border-slate-500 lg:px-8 md:px-3 md:py-2 rounded-md mx-2 lg:text-lg md:text-sm bg-indigo-600 text-white hover:bg-sky-100 hover:text-black font-bold">
              Register
            </button>
          </Link>
        </div>

        <div onClick={handleClick}>
          {!nav ? (
            <div className="w-7 md:hidden" />
          ) : (
            <div className="w-7 md:hidden" />
          )}
        </div>
      </div>

      <ul
        className={
          !nav
            ? "hidden"
            : "absolute w-[80%] mx-auto md:hidden items-center my-5 bg-slate-50 px-8 rounded-xl"
        }
      >
        <li className="mx-4 py-4">
          <div className="w-7" onClick={Search} />
        </li>

        <li className="mx-4 py-3 border-b-2 border-slate-200">Home</li>
        <li className="mx-4 py-3 border-b-2 border-slate-200">About</li>
        <li className="mx-4 py-3 border-b-2 border-slate-200">Documentation</li>
        <li className="mx-4 py-3 border-b-2 border-slate-200">Product</li>
        <li className="py-3">
          <div className="md:hidden">
            <button className="md:hidden w-full rounded-lg py-3 my-3 border-2 border-indigo-600 text-xl font-bold">
              Login
            </button>
            <button className="md:hidden w-full rounded-lg py-3 my-2 bg-indigo-600 text-white text-xl font-bold hover:bg-sky-100 hover:text-black">
              Register
            </button>
          </div>
        </li>
      </ul>

      <div
        className={
          search
            ? "absolute w-full flex items-start justify-center h-screen bg-gradient-to-r from-slate-600 to-transparent top-0 left-0"
            : "hidden"
        }
      >
        <form action="" className="my-16 absolute top-1/4 flex">
          <input
            type="text"
            placeholder="Search"
            className="py-5 px-16 rounded-3xl"
          />
          <div className="w-7 mx-3" onClick={Hide} />
        </form>
      </div>

      <div className="w-full h-full flex items-center justify-center flex-wrap py-5">
        <div>
          <h1 className="text-2xl font-bold">
            <span className="text-6xl font-bold text-blue-800 py-3">Welcome to</span> Form Builder
          </h1>
          <p className="text-2xl font-medium py-3">
            Simplify the way you design forms with our intuitive drag-and-drop interface.
          </p>
          <button className="bg-indigo-600 text-white rounded-lg py-3 my-2 px-3 font-bold hover:bg-sky-100 hover:text-black">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
