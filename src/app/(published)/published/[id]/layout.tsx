import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css"; // Import global styles

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Published Page",
  description: "This is the published version of the form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="mx-auto w-full max-w-none">{children}</div>
      </body>
    </html>
  );
}


// inter is imoprtsant to not show the rootlayout