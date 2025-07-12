"use client";

import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Define internal and external links
const navItems = [
  { name: "About", link: "#about", external: false },
  { name: "Projects", link: "#projects", external: false },
  { name: "Github", link: "https://www.github.com/AvishekxD", external: true },
  { name: "Contact", link: "#contact", external: false },
];

const MobileMenuDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button aria-label="Open menu" className="md:hidden">
          <Menu className="w-6 h-6 text-black dark:text-white" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />

        <Dialog.Content
          className={cn(
            "fixed top-0 right-0 h-full w-64 bg-white dark:bg-neutral-900 z-50 shadow-xl flex flex-col p-6 space-y-6",
            "data-[state=open]:animate-in data-[state=open]:slide-in-from-right",
            "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right"
          )}
        >
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-lg font-mono font-bold text-black dark:text-white">
              Menu
            </Dialog.Title>

            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="w-5 h-5 text-black dark:text-white" />
            </button>
          </div>

          <Dialog.Description className="sr-only">
            Navigation menu with links to About, Projects, Github, and Contact sections.
          </Dialog.Description>

          <nav className="flex flex-col space-y-4">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.link}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="font-mono text-base text-black dark:text-white hover:text-pink-600 transition-colors"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.link}
                  href={item.link}
                  onClick={() => setOpen(false)}
                  className="font-mono text-base text-black dark:text-white hover:text-pink-600 transition-colors"
                >
                  {item.name}
                </Link>
              )
            )}
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MobileMenuDrawer;
