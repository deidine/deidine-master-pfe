import { Separator } from "@radix-ui/react-separator";
import React from "react";
import { Skeleton } from "../ui/skeleton";
 
export default function DesignSkeleton() {
  return (
    <div
      className="size-full relative h-screen rounded-xl 
    border border-black/10 bg-white shadow-sm"
    >
      <Skeleton
        className="absolute w-40  
       border-r-black px-[80px]  h-full border-l-2 top-0 left-0 z-10"
      >
        <div className="flex flex-col pt-[120px] items-center  justify-between  ">
          <div className="bg-white p-1 rounded-lg z-10 shadow-lg">
            <Skeleton className="w-20 h-20  rounded-[5px]" />
          </div>{" "}
          <Separator
            orientation="vertical"
            decorative
            className="h-3.5 border-neutral-100"
          />{" "}
          <div className="bg-white p-1 rounded-lg z-10 shadow-lg">
            <Skeleton className="w-20 h-20  rounded-[5px]" />
          </div>{" "}
          <Separator
            orientation="vertical"
            decorative
            className="h-3.5 border-neutral-100"
          />{" "}
          <div className="bg-white p-1 rounded-lg z-10 shadow-lg">
            <Skeleton className="w-20 h-20  rounded-[5px]" />
          </div>{" "}
          <Separator
            orientation="vertical"
            decorative
            className="h-3.5 border-neutral-100"
          />
        </div>
      </Skeleton>{" "}
      <div>
        <Skeleton className="h-[80px] w-ful z-20" />
      </div>
      <div className=" mx-auto max-w-2xl  mt-3 border shadow rounded-xl w-1/2 h-[70%] ">
        <Skeleton className=" h-full w-full  rounded-xl  " />
      </div>
      <div className="w-full fixed bottom-0 flex  
      justify-end pr-[100px] pb-[50px] items-center right-0 shadow-lg   h-auto z-10 ">
        <Skeleton className="w-40 h-14   fixed btn_header text-white flex items-center justify-around   bg-[#36b3fa]
          font-[14px] text-2xl gap-4 " 
          >
          
            </Skeleton>
      </div>
    </div>
  );
}
