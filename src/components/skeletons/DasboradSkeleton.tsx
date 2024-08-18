import { Separator } from "@radix-ui/react-separator";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Divider } from "antd";

export default function DasboradSkeleton() {
  return (
    <div className="w-full  bg-mainColor  flex flex-col justify-between px-[2.5rem] pt-[1rem] items-start">
     
     <div className="flex justify-end items-center w-full">
   <div className=" bg-white my-auto p-2 rounded-lg ">

     <Skeleton className="h-10 rounded-lg w-[100px]" />
   </div>

     </div>
      <div  className=" ml-[2.5rem] py-[4px] pl-[2px] w-[40%]  bg-white ">
        <p className="text-[25px] flex flex-row gap-3  text-center items-center">
        
          <Skeleton className="h-6 rounded-full w-6 bg-white" />
          <Skeleton className="h-4 w-[60%] bg-white" />
        </p>
      </div>
          <Separator
            orientation="vertical"
            decorative
            className="h-8 border-neutral-100"
          />
      <div className="flex  px-[2.5rem]  flex-wrap  gap-[2rem]">
 
        <CardFormSkeleton />
        <CardFormSkeleton />
       
      </div>
      <Divider
            style={{
              borderColor: "black",
              marginTop: "1rem",
              marginBottom: "1rem",
              width: "100%",
              height: "1px",
            }}
          />
            <div  className=" ml-[2.5rem] py-[4px] pl-[2px] w-[40%]  bg-white ">
        <p className="text-[25px] flex flex-row gap-3  text-center items-center">
        
          <Skeleton className="h-6 rounded-full w-6 bg-white" />
          <Skeleton className="h-4 w-[60%] bg-white" />
        </p>
      </div>
          <Separator
            orientation="vertical"
            decorative
            className="h-8 border-neutral-100"
          />
      <div className="flex  px-[2.5rem]  flex-wrap  gap-[2rem]">
      <CardFormSkeleton />
      <CardFormSkeleton />
      <CardFormSkeleton />
      <CardFormSkeleton />
    </div>
    </div>
  );
}

function CardFormSkeleton() {
  return (
    <div className="rounded-[15px] relative hover:bg-slate-100  bg-white border-2 p-4 w-[400px] h-[200px] cursor-pointer">
      <div className="flex  gap-3 items-center">
        <Skeleton className="h-6 rounded-full w-6" />
        <Skeleton className="h-4 w-[30%]" />
        <Skeleton className="h-4 rounded-full w-[15%]" />
      <div className="absolute text-white right-0 mb-[18px] mr-[18px]  ">

        <div className="flex gap-[1px] justify-end items-center">
          <Skeleton className="h-2 rounded-full w-2" />
          <Skeleton className="h-2 rounded-full w-2" />
          <Skeleton className="h-2 rounded-full w-2" />
        </div>
      </div>
        <Separator
          orientation="vertical"
          decorative
          className="h-3.5 border-neutral-100"
        />
      </div>
      <Separator
        orientation="vertical"
        decorative
        className="h-3.5 border-neutral-100"
      />
      <p>
        <Skeleton className="w-[60%] h-4" />

        <Separator
          orientation="vertical"
          decorative
          className="h-3.5 border-neutral-100"
        />
        <Skeleton className="w-[70%] h-4" />
        <Separator
          orientation="vertical"
          decorative
          className="h-3.5 border-neutral-100"
        />
        <Skeleton className="w-[100%] h-4" />
      </p>
      <div className="absolute text-white right-0 mb-[18px] mr-[18px] bottom-0">
        <Separator
          orientation="vertical"
          decorative
          className="h-3.5 border-neutral-100"
        />
        <Skeleton className="w-20  h-7 font-semibold rounded-[20px] shadow-lg p-4" />
      </div>
    </div>
  );
}
