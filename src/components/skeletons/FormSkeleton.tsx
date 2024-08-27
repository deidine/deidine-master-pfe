import { Separator } from "@radix-ui/react-separator";
import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function FormSkeleton() {
  return (
    <div
      className="size-full relative h-screen rounded-xl  bg-mainColor
    border border-black/10  shadow-sm"
    > 
      <MidelSkeleton /> 
    </div>
  );
}
 

function MidelSkeleton() {
  return (
    <div className=" mx-auto bg-white p-4  max-w-2xl  mt-28 border shadow rounded-xl w-1/2  ">
      <CardEditFormSkeleton />
      <CardEditFormSkeleton />
      <CardEditFormSkeleton />
      <CardEditFormSkeleton />
    </div>
  );
}
 

function CardEditFormSkeleton() {
  return (
 <div className="flex flex-col gap-px justify-between items-start">
        <Skeleton className={`text-sm rounded-lg shadow-sm  text-gray-500 h-4 w-14`}/>
    <Separator
            orientation="vertical"
            decorative
            className="h-3.5 border-neutral-100"
          />
      
   <Skeleton className=""/>
     <Skeleton className=" flex flex-col relative justify-between w-full p-2 mb-2 border rounded-lg shadow-sm group">
      <div className=" flex flex-col space-y-3 p-2  relative flex-1 ">
        <div className="h-2 w-full " />
      </div>
    </Skeleton>
    <Separator
            orientation="vertical"
            decorative
            className="h-2 border-neutral-100"
          />
 </div>
  );
}
