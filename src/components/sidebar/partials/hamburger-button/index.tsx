"use client";

import { useSidebarContext } from "../../context";
import { RxHamburgerMenu } from "react-icons/rx";

export function HamburgerButton() {
  const { open } = useSidebarContext();

  return (
    <button
      type="button"
      onClick={open}
      className="lg:hidden p-1.5 rounded hover:bg-white/10 mr-2 text-white/80 hover:text-white/90 transition-colors"
      aria-label="Open sidebar"
    >
      <RxHamburgerMenu className="w-5 h-5" />
    </button>
  );
}
