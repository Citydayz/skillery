"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

type Tool = {
  slug: string;
  title: string;
};

const CACHE_KEY = "tools_cache";
const CACHE_DURATION = 1000 * 60 * 60; // 1 heure

export default function Header() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadTools = useCallback(async () => {
    try {
      // Vérifier le cache
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setTools(data);
          setIsLoading(false);
          return;
        }
      }

      // Charger les données
      const module = await import("@/data/tools.json");
      const toolsData = module.default;

      // Mettre en cache
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data: toolsData,
          timestamp: Date.now(),
        })
      );

      setTools(toolsData);
    } catch (error) {
      console.error("Erreur lors du chargement des outils:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTools();
  }, [loadTools]);

  const handleMouseLeave = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md transition">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold tracking-wide">⚙️ Skillery</h1>
        <nav className="space-x-6 flex items-center relative">
          <Link href="/" className="hover:text-[#00ADB5]">
            Accueil
          </Link>

          <Link href="/about" className="hover:text-[#00ADB5]">
            À propos
          </Link>

          {/* Dropdown menu */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="hover:text-[#00ADB5]"
              aria-expanded={open}
              aria-haspopup="true"
            >
              Outils ▾
            </button>
            {open && (
              <div
                className="absolute top-full left-0 bg-white border border-gray-200 rounded shadow-md mt-2 z-20 min-w-[200px]"
                onMouseLeave={handleMouseLeave}
                role="menu"
              >
                {isLoading ? (
                  <div className="px-4 py-2 text-sm text-gray-500">
                    Chargement...
                  </div>
                ) : (
                  tools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="block px-4 py-2 hover:bg-[#00ADB5]/10 text-sm"
                      onClick={() => setOpen(false)}
                      role="menuitem"
                    >
                      {tool.title}
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>

          <Link href="/pricing" className="hover:text-[#00ADB5]">
            Tarifs
          </Link>

          <Link href="/blog" className="hover:text-[#00ADB5]">
            Blog
          </Link>

          <Link href="/contact" className="hover:text-[#00ADB5]">
            Contact
          </Link>

          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Connexion</Button>
            </Link>
            <Link href="/register">
              <Button>Inscription</Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
