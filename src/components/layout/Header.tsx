"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button"; // Si tu n'as pas le Button, utilise un simple <button>

type Tool = {
  slug: string;
  title: string;
};

export default function Header() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    import("@/data/tools.json").then((mod) => {
      setTools(mod.default);
    });
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md transition">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold tracking-wide">⚙️ Skillery</h1>
        <nav className="space-x-6 flex items-center relative">
          <Link href="/" className="hover:text-[#00ADB5]">
            Accueil
          </Link>

          {/* Dropdown menu */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="hover:text-[#00ADB5]"
            >
              Outils ▾
            </button>
            {open && (
              <div
                className="absolute top-full left-0 bg-white border border-gray-200 rounded shadow-md mt-2 z-20 min-w-[200px]"
                onMouseLeave={() => setOpen(false)}
              >
                {tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="block px-4 py-2 hover:bg-[#00ADB5]/10 text-sm"
                    onClick={() => setOpen(false)}
                  >
                    {tool.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/blog" className="hover:text-[#00ADB5]">
            Blog
          </Link>

          {/* Liens de Connexion et Inscription */}
          <Link href="/login">
            <Button className="hover:text-[#00ADB5]">Connexion</Button>
          </Link>
          <Link href="/register">
            <Button className="hover:text-[#00ADB5]">Inscription</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
