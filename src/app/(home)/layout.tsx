 
import { Inter } from "next/font/google";
import "../globals.css";
import NavBar from "@/components/navBar/NavBar";
import DesignerContextProvider from "@/context/DesignerContext";
import GeneralContextProvider from "@/context/GeneralContext";
import StyleContextProvider from "@/context/StyleContex";
import { GoogleAnalytics } from '@next/third-parties/google'
import { NextSeo } from 'next-seo';
const inter = Inter({ subsets: ["latin"] });
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-mainColor`}>
       
          <DesignerContextProvider>
          <GeneralContextProvider>
            <StyleContextProvider>
            <NavBar />
            <div className="flex w-full flex-col flex-grow mx-auto">
              {children}
            </div>
            </StyleContextProvider>
          </GeneralContextProvider>
        </DesignerContextProvider>
      </body>
        <GoogleAnalytics  gaId="G-1N59NG1HZD" />
    </html>
  );
}
 