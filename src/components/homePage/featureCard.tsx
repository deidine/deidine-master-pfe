import React from "react";
export default function FeatureCard({ icon,title,description}:{
    icon:JSX.Element;
    title:string;
    description:string}) {
  return (
    <div className="flex flex-col cursor-pointer w-80 py-[20px] px-[25px] justify-between items-center gap-4 border-[1px] 
    shadow-sm border-gray-500 rounded-[16px] ">
      <div className="flex flex-row justify-start w-full items-center  gap-4">
        {icon}
        <span className="  font-semibold size-3">{title}</span>
      </div>
      <div>
        {description}
      </div>
    </div>
  );
}
