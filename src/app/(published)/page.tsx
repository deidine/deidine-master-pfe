"use client";

import { CiSaveDown1 } from "react-icons/ci";
import FeatureCard from "@/components/homePage/featureCard";
import Hero from "@/components/homePage/Hero";
import GiveTry from "@/components/homePage/GiveTry";
import UnderLine from "@/components/homePage/UnderLine";
import Footer from "@/components/homePage/Footer";
 
export default function Home() {
  return (
    <>
    <div className="p-10"> 
      <div className="flex flex-row justify-between items-center gap-4">
        <Hero />
    
      </div> 
        <UnderLine title="Main Features"/>
       
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
        <UnderLine title="Give it a try yourSelf"/>

      <GiveTry/>
    </div>
      <div><Footer/></div></>
  );
}
