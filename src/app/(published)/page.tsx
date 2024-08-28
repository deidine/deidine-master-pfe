"use client";


import Hero from "@/components/homePage/Hero";
import GiveTry from "@/components/homePage/GiveTry";
import UnderLine from "@/components/homePage/UnderLine";
import Footer from "@/components/homePage/Footer";
import Features from "@/components/homePage/featureCard";
import { useTranslation } from "react-i18next";
export default function Home() {
  if (typeof document === "undefined") {
    // Prevent execution during SSR
    return null;
  }  
  
  const { t } = useTranslation();

  return (

  <div>
     
      <div className="p-10">
        <div className="flex flex-row justify-between items-center gap-4">
          <Hero />{t("report_bug")}
        </div>
        <UnderLine title={t("main_features")} />
 

      <Features/>

        <UnderLine title={t("give_try")}  />

        <GiveTry />
      </div>
      <div>
        <Footer />
      </div>
    </div> 

  );
}
