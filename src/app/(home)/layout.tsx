import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import NavBar from "@/components/navBar/NavBar";
import DesignerContextProvider from "@/context/DesignerContext";
import GeneralContextProvider from "@/context/GeneralContext";
import StyleContextProvider from "@/context/StyleContex"; 
import AntdConfigProvider from "@/components/AntdConfigProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quick Form",
  description: "Build and design custom forms easily",
  metadataBase: new URL("https://deidine-master.vercel.app/"),
  openGraph: {
    title: "Quick Form",
    description: "Create and design custom forms effortlessly with Quick Form.",
    url: "https://deidine-master.vercel.app/",
    siteName: "Quick Form",
    images: [
      {
        url: "./assets/og.png",
        width: 1200,
        height: 630,
        alt: "Quick Form Open Graph Image",
      },
    ],
    type: "website",
  },
  
  icons: {
    icon: "/favicon.ico",  
  },
  keywords: ["form builder","quick form", "custom forms", "design forms", "web forms"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Additional metadata or links can go here */}
      </head>
      <body className={`${inter.className} bg-mainColor`}>
        <AntdConfigProvider>
          <DesignerContextProvider>
            <GeneralContextProvider>
              <StyleContextProvider>
                <NavBar />
                <div className="flex w-full pt-4 flex-col flex-grow mx-auto">
                  {children}
                </div>
              </StyleContextProvider>
            </GeneralContextProvider>
          </DesignerContextProvider>
        </AntdConfigProvider>
      </body>
    </html>
  );
}
