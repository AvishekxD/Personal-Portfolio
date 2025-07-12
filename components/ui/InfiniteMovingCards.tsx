"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const techIconMap: { [key: string]: string } = {
  "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Node.js": "/assets/nodejs-logo-svg.svg",
  "Express": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "Stripe": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/stripe/stripe-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "TailwindCSS": "/assets/Tailwind_CSS_Logo.svg",
  "chrome-extension": "/assets/Google_Chrome.svg",
  "clerk": "/assets/clerk.svg",
  "Gemini" : "/assets/gemini.svg",
  "Zustand": "https://raw.githubusercontent.com/pmndrs/zustand/main/docs/images/logo.png",
  "Firebase": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "Flask": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
  "Framer-Motion": "/assets/motion.svg",
  "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "HTML": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  "VS Code": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  "vercel" : "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
};

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    technologies: string[];
    imageUrl?: string;
    url?: string; // ✅ Added link field
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
      containerRef.current.style.setProperty(
        "--animation-duration",
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s"
      );
      setStart(true);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-3xl h-full shrink-0 flex-nowrap gap-12 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {(items || []).map((item, idx) => (
          <li
            key={item.name + idx}
            className="relative w-[250px] shrink-0 rounded-2xl border border-zinc-200 px-6 py-6 md:w-[320px] dark:border-zinc-700"
          >
            {/* Border overlay */}
            <div
              aria-hidden="true"
              className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+4px)] w-[calc(100%_+4px)]"
            />

            {/* Image with link */}
            {item.imageUrl && item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={320}
                  height={180}
                  className="rounded-md object-cover aspect-video mb-4 mt-2 w-full shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out shadow-neutral-700"
                />
              </a>
            ) : (
              item.imageUrl && (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={320}
                  height={180}
                  className="rounded-md object-cover aspect-video mb-4 mt-2 w-full shadow-md transition-all duration-300 ease-in-out shadow-neutral-700"
                />
              )
            )}

            {/* Project Title */}
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              {item.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-zinc-800 dark:text-zinc-200 mb-4 text-justify">
              {item.quote}
            </p>

            {/* Technologies */}
            <div className="flex flex-col gap-1 text-xs text-zinc-700 dark:text-zinc-400">
              <span className="font-semibold">Technologies:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {item.technologies.map((tech, i) => {
                  const iconSrc =
                    techIconMap[tech] ||
                    `https://placehold.co/24x24/CCCCCC/333333?text=${tech.charAt(
                      0
                    )}`;
                  return (
                    <Image
                      key={i}
                      src={iconSrc}
                      alt={tech}
                      width={24}
                      height={24}
                      title={tech}
                      className="rounded-sm mb-2"
                    />
                  );
                })}
              </div>
                {item.url && (
                  <span className="mt-1 text-black dark:text-white hover:scale-105 transition-transform duration-200 ease-in-out hover:text-neutral-400 font-mono inline-block">
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block relative after:block after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-0 after:bg-neutral-400 hover:after:w-full after:transition-all after:duration-300"
                    >
                      Live
                    </a>
                  </span>
                )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
