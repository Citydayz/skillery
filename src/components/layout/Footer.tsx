"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-gray-100 text-gray-800 text-center py-4 mt-10 transition-colors duration-300">
      <p className="text-sm">
        © {year ?? "..."} Skillery. Tous droits réservés.
      </p>
    </footer>
  );
}
