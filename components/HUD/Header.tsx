"use client";

import { useState } from "react";
import MobileMenuDrawer from "./MobileMenuDrawer";

import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNav,
} from "@/components/resizable-navbar";

// Internal nav links (mobile menu uses a separate list)
const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Contact", link: "#contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30">
      <div className="w-full max-w-6xl mx-auto px-4 py-4 flex items-center">
        <Navbar>
          <NavBody>
            <NavbarLogo />
            <NavItems items={navItems} />
            <div className="hidden md:flex items-center gap-4">
              <a
                href="https://github.com/AvishekxD"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-md bg-transparent text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center dark:text-white"
              >
                Github
              </a>

              <NavbarButton variant="primary" href="#contact">
                Contact Me
              </NavbarButton>
            </div>
          </NavBody>

          <MobileNav>
            <MobileNavHeader>
              <NavbarLogo />
              <div className="md:hidden">
                <MobileMenuDrawer />
              </div>
            </MobileNavHeader>
          </MobileNav>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;
