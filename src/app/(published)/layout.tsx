 
import { Inter } from "next/font/google";
import "../globals.css"; // Import global styles
import { NextSeo } from 'next-seo';
const inter = Inter({ subsets: ["latin"] });
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <body className={` bg-white ${inter.className}`}>    
    
     
        <div className="mx-auto w-full max-w-none">{children}</div>
      </body>
     </html>
  );
}


// inter is imoprtsant to not show the rootlayout