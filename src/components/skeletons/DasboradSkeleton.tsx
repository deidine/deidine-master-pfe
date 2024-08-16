import { Separator } from "@radix-ui/react-separator";
import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function DasboradSkeleton() {
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
          <Skeleton className="w-20 h-20" />
          <Separator
            orientation="vertical"
            decorative
            className="h-3.5 border-neutral-100"
          />

          <Skeleton className="w-20 h-20" />
          <Separator
            orientation="vertical"
            decorative
            className="h-3.5 border-neutral-100"
          />

          <Skeleton className="w-20 h-20" />
          <Separator
            orientation="vertical"
            decorative
            className="h-3.5 border-neutral-100"
          />

          <Skeleton className="w-20 h-20" />
        </div>
      </Skeleton>{" "}
      <div>
        <Skeleton className="h-[80px] w-ful z-20" />
      </div>

      <div className="w-40 h-40 bg-black">deidein</div>
    </div>
  );
}

{
  /* 
    <div className="mb-8 flex justify-between p-6">
<Skeleton className="h-5 w-1/2" />
<div className="flex w-1/3 gap-1.5">
  <Skeleton className="size-5 shrink-0" />
  <Skeleton className="h-5 w-full" />
</div>
</div>
<div className="mt-2 p-6 pt-2">
<Skeleton className="h-[75px] w-full" />
<div className="mt-[52px] flex items-center justify-between gap-2">
  <Skeleton className="h-3.5 w-1/4" />
  <Separator
    orientation="vertical"
    decorative
    className="h-3.5 border-neutral-100"
  />
  <Skeleton className="h-3.5 w-1/4" />
  <Separator
    orientation="vertical"
    decorative
    className="h-4 border-neutral-100"
  />
  <Skeleton className=" h-4 w-1/4" />
</div>
<Skeleton className="mt-5 h-4 w-1/2" />
</div>
<div className="p-2.5 pt-0">
<Skeleton className="h-9 w-full rounded-[5px]" />
</div> */
}
