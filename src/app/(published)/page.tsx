"use client";
 
import Content from "@/components/homePage/Content";
import Hero from "@/components/homePage/Hero";
import Pricing from "@/components/homePage/Pricing";
import Support from "@/components/homePage/Support";
import { Button } from "antd";
import { Footer } from "antd/es/layout/layout"; 
import Link from "next/link";

export default function Home() { 
  return (
    <div>
       <Hero/>
      <Content/>
      <Support/>
      <Pricing/>
      <Footer/>

    </div>
  );
}
