"use client";
import Hero from "@/components/homePage/Hero";
import GiveTry from "@/components/homePage/GiveTry";
import UnderLine from "@/components/homePage/UnderLine";
import Footer from "@/components/homePage/Footer";
import Features from "@/components/homePage/featureCard";
export default function Home() {
  return (
    <div>
      <div className="p-10">
        <div className="flex flex-row justify-between items-center gap-4">
          <Hero />
        </div>
        <UnderLine title="Fonctionnalités Principales" />

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
