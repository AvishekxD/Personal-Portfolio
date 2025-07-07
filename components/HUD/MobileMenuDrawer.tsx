"use client";

import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
  { label: "Github", href: "github"},
];

const MobileMenuDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button aria-label="Open menu" className="md:hidden">
          <Menu className="w-6 h-6 text-black" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
        <Dialog.Content
          className={cn(
              "fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-xl flex flex-col p-6 space-y-6 transition-transform duration-400 ease-in-out",
              open ? "animate-in slide-in-from-right" : "animate-out slide-out-to-right"
            )}
          >
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-lg font-mono font-bold text-black">
              Menu
            </Dialog.Title>

            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="w-5 h-5 text-black" />
            </button>
          </div>

          <Dialog.Description className="sr-only">
            Navigation menu with links to About, Projects, and Contact sections.
          </Dialog.Description>

          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-mono text-base text-black hover:text-pink-600 transition-all"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MobileMenuDrawer;
