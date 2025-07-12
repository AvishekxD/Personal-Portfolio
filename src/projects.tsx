"use client"

import { InfiniteMovingCards } from '@/components/ui/InfiniteMovingCards';
import Image from 'next/image';
import React from 'react';

interface ProjectsSectionProps {
  className?: string;
}

const testimonials = [
  {
    imageUrl: "/assets/projectsImages/FableNest-homepage.gif",
    quote:
      "A full-featured blogging platform built using the MERN stack. This project allows users to create, read, update, and delete blog posts with a seamless user experience.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "clerk", "TailwindCSS", "Framer-Motion" ],
    name: "FableNest",
    url: "https://fablenest-olive.vercel.app/",

  },
  {
    imageUrl: "/assets/projectsImages/joinflow.png",
    quote: "JoinFlow is a cutting-edge video conferencing platform built with Next.js, TypeScript, and Tailwind CSS. It enables users to schedule and join meetings, record sessions, chat in real time, and manage participants — all within a sleek, responsive, and secure interface powered by Clerk and GetStream.io.",
    name: "JoinFlow ",
    technologies: ["TypeScript", "Next.js", "clerk", "TailwindCSS", "Framer-Motion"],
    url: "https://join-flow.vercel.app/sign-in",
  },
  {
    imageUrl: "/assets/projectsImages/portfolio.gif",
    quote:
      "A futuristic, immersive portfolio built using Next.js, TypeScript, TailwindCSS.",
    name: "Jane Austen",
    technologies: ["TypeScript", "Next.js", "TailwindCSS", "Framer-Motion", "vercel"],
    url: "https://avishekxd.vercel.app/",
  },
  {
    imageUrl: "/assets/projectsImages/Ai-Simplify.png",
    quote:
      "AI powered Chrome extension that uses AI to summarize content from Research papers, articles, news, blogs.",
    name: "Ai-Simplify",
    technologies: ["JavaScript", "TailwindCSS", "chrome-extension", "Gemini"],
    url: "https://github.com/AvishekxD/AI-Simplify-chrome_extension",
  },
];

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ className = '' }) => {
    return (
    <section className={`min-h-screen py-16 px-4 ${className}`}>
        <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
        />
        </div>
    </section>
    );
};

export default ProjectsSection;