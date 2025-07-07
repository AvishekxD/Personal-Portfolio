"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MobileMenuDrawer from "./MobileMenuDrawer";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
  { label: "Github", href: "github"},
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <div className="w-full max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold font-mono text-black px-6">Avishek.xd</h1>

        <nav className="hidden md:flex gap-6 px-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-sm text-black hover:text-pink-600 transition-all"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="md:hidden">
          <MobileMenuDrawer />
        </div>
      </div>
    </header>
  );
};

export default Header;
