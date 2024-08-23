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
  openGraph: {
    title: "Quick Form",
    description: "Create and design custom forms effortlessly with Quick Form.",
    url: "https://deidine-master.vercel.app/",
    siteName: "Quick Form",
    images: [
      {
        url: "https://deidine-master.vercel.app/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Quick Form Open Graph Image",
      },
    ],
    type: "website",
  },
  
  icons: {
    icon: "/favicon.ico", // Ensure you have this in your public folder
  },
  keywords: ["form builder", "custom forms", "design forms", "web forms"],
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
                <div className="flex w-full flex-col flex-grow mx-auto">
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
