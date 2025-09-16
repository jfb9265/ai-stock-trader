import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google"; // Import Lora
import "./globals.css";
// import Sidebar from "@/components/Sidebar"; // Remove Sidebar import
import Navbar from "@/components/Navbar"; // Will create this next

const inter = Inter({ subsets: ["latin"] });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" }); // Define Lora as a CSS variable

export const metadata: Metadata = {
  title: "AI Stock Trader",
  description: "An interactive dashboard for AI-driven stock analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${lora.variable} bg-gray-950 text-gray-200 min-h-screen flex flex-col`}>
        <Navbar /> {/* New Navbar */}
        <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
