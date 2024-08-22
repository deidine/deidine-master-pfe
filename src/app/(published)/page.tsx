"use client";

import { CiSaveDown1 } from "react-icons/ci";
import FeatureCard from "@/components/homePage/featureCard";
import Hero from "@/components/homePage/Hero";

export default function Home() {
  return (
    <div>
<div className="flex flex-row justify-between items-center gap-4">
<Hero/>
<Hero/>

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
  );
}
