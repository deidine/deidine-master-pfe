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
      <CardEditFormSkeleton /> <Separator
          orientation="vertical"
          decorative
          className="h-3.5 border-neutral-100"
        />
      <CardEditFormSkeleton /> <Separator
          orientation="vertical"
          decorative
          className="h-3.5 border-neutral-100"
        />
      <CardEditFormSkeleton /> <Separator
          orientation="vertical"
          decorative
          className="h-3.5 border-neutral-100"
        />
      <CardEditFormSkeleton />
    </div>
  );
} 
function CardEditFormSkeleton() {
  return (
    <Skeleton className=" flex flex-col relative justify-between w-full p-4 mb-2 border rounded-xl shadow-sm group">
      <div className=" flex flex-col space-y-3 p-4  relative flex-1 ">
        <div className="h-[6px] w-full " />
      </div>
    </Skeleton>
  );
}
