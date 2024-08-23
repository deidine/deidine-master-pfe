import React from "react";
export default function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: JSX.Element;
  title: string;
  description: string;
}) {
  return (
    <div
      className="flex transform    flex-col  w-[400px] py-[20px] px-[25px] justify-between items-center gap-4 border-[1px] 
    shadow-sm border-gray-500 rounded-[16px] "
    >
      <div className="flex flex-row justify-start text-buttonColor w-full items-center  gap-4">
        <span className=" text-2xl font-bold">{icon}</span>{" "}
        <div className="  font-semibold  text-md text-buttonColor uppercase">
          {title}
        </div>
      </div>
      <div className="font-title w-full h-full text-md text-wrap flex items-center justify-start">{description}</div>
    </div>
  );
}
