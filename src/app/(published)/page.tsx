"use client";
 
import Content from "@/components/homePage/Content";
import Features from "@/components/homePage/Features";
import Footer from "@/components/homePage/Footer";
import Hero from "@/components/homePage/Hero"; 
import Support from "@/components/homePage/Support";
  
export default function Home() { 
  return (
    <div>
       <Hero/>
      <Content/>
      <Support/>
      <Features/>
      <Footer/>

    </div>
  );
}
