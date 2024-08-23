import { FaCloudArrowUp } from "react-icons/fa6";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
export default function GiveTry() {
  return (
    <section id="about" className="w-full flex gap-[70px] my-8 py-14 px-16">
     <div className="bg-buttonColor flex flex-col gap-4 p-[25px] w-[30%] rounded-lg">
        <div className="flex flex-col text-white gap-2 justify-center items-center">
         <span className="text-[60px] bg-white p-4 rounded-full "> <FaLocationDot className="text-buttonColor" /></span>
        <p className="text-2xl font-bold">Create on our server</p>
        </div>
        <div className="flex flex-col text-white gap-2 justify-center items-center">
         <p className="text-md font-mono"> we provide nice edit for input elemtn evry one con build wuiwly orm</p>
        </div>
      </div>
      <div className="bg-buttonColor flex flex-col gap-4 p-[25px] w-[30%] rounded-lg">
        <div className="flex flex-col text-white gap-2 justify-center items-center">
         <span className="text-[60px] bg-white p-4 rounded-full "> <FaCloudArrowUp className="text-buttonColor" /></span>
        <p className="text-2xl font-bold">Create on our server</p>
        </div>
        <div className="flex flex-col text-white gap-2 justify-center items-center">
         <p className="text-md font-mono"> we provide nice edit for input elemtn evry one con build wuiwly orm</p>
        </div>
      </div>
    </section>
  );
}
