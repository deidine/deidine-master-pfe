"use client";
import Hero from "@/components/homePage/Hero";
import GiveTry from "@/components/homePage/GiveTry";
import UnderLine from "@/components/homePage/UnderLine";
import Footer from "@/components/homePage/Footer";
import Features from "@/components/homePage/featureCard";
import { useTranslation } from "react-i18next";
import { languages } from "../../i18n/i18n";

export default function Home() {
  const { t } = useTranslation();

  const { i18n } = useTranslation();

  return (
    <div>
      {languages.map((l) => (
        <button
          key={l.code}
          onClick={() => i18n.changeLanguage(l.code)}
          className={`space-y-1 py-3 px-4 rounded-md bg-zinc-700 hover:bg-zinc-600 border-2  ${i18n.language === l.code ? "border-zinc-400" : "border-transparent"}`}
        >
          <div className="flex justify-between items-center">
            <div className="font-semibold">{l.native_name}</div>
            <div className="opacity-60">{l.code}</div>
          </div>
          <div className="text-start">{l.name} </div>
        </button>
      ))}
      <div className="p-10">
        <div className="flex flex-row justify-between items-center gap-4">
          <Hero />{t("report_bug")}
        </div>
        <UnderLine title="Fonctionnalités Principales" />
<button onClick={()=>{

}}>
  click
</button>

      <Features/>

        <UnderLine title="Essayez-le vous-même" />

        <GiveTry />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
