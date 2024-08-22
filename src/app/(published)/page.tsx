"use client";

import { CiSaveDown1 } from "react-icons/ci";
import FeatureCard from "@/components/homePage/featureCard";
import Hero from "@/components/homePage/Hero";

export default function Home() {
  return (
    <div className="p-10">
      <div className="flex flex-row justify-between items-center gap-4">
        <Hero />
    
      </div>
      <div>
        <div className="font-semibold w-1/2  text-black mt-[1rem] mx-[1rem]">
          <div className="py-10">
            <span className="font-bold text-lg">
            Main Features
            </span>
            <span className="block h-1 w-[20%] mt-1 bg-buttonColor  "></span>
          </div>
        </div>
        <div className="p-2 flex flex-wrap gap-9">
          <FeatureCard
            icon={<CiSaveDown1 />}
            title={"deiidne"}
            description={
              "we provide nice edit for input elemtn evry one con build wuiwly orm"
            }
          />
          <FeatureCard
            icon={<CiSaveDown1 />}
            title={"deiidne"}
            description={
              "we provide nice edit for input elemtn evry one con build wuiwly orm"
            }
          />
          <FeatureCard
            icon={<CiSaveDown1 />}
            title={"deiidne"}
            description={
              "we provide nice edit for input elemtn evry one con build wuiwly orm"
            }
          />
        </div>
      </div>
    </div>
  );
}
