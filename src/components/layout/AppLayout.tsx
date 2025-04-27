"use client";

import Header from "./Header";
import Footer from "./Footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black transition-colors duration-300">
      <Header />
      <main className="flex-grow w-full">{children}</main>
      <Footer />
    </div>
  );
}
