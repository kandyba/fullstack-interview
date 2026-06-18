"use client";

import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Прокрутити вгору"
      className={[
        "fixed bottom-6 right-6 z-50 rounded-full border border-slate-700",
        "bg-slate-900/90 px-4 py-2 text-sm font-medium text-slate-100 shadow-lg",
        "transition-all hover:border-blue-500 hover:text-white",
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      ].join(" ")}
    >
      ↑ Вгору
    </button>
  );
}
