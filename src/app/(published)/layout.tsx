import { Inter } from "next/font/google";
import "../globals.css"; // Import global styles
import { NextSeo } from "next-seo";
import { Metadata } from "next";
import NavBar from "@/components/navBar/NavBar";
import GeneralContextProvider from "@/context/GeneralContext";
import LocalProvider from "../LocalProvider";
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
  keywords: [
    "form builder",
    "quick form",
    "custom forms",
    "design forms",
    "web forms",
  ],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` bg-white ${inter.className}`}>
       <LocalProvider>
       <GeneralContextProvider>
          <NavBar />
          <div className="flex w-full pt-4 flex-col flex-grow mx-auto">
            {children}
          </div>
        </GeneralContextProvider>
        </LocalProvider>
      </body>
    </html>
  );
}

// inter is imoprtsant to not show the rootlayout
