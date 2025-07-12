"use client";

import React from "react";
import { motion } from "framer-motion";

const skills = [
  {
    name: "TailwindCSS",
    src: "/assets/Tailwind_CSS_Logo.svg",
  },
  {
    name: "React",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "MongoDB",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "Express.js",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    name: "JavaScript",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "C++",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },
  {
    name: "GitHub",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
];

const SkillsGrid = () => {
  return (
    <motion.div
      className="flex flex-wrap justify-center items-center gap-8 mt-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          className="relative group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-4 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-300 z-10 whitespace-nowrap ease-in-out">
            {skill.name}
          </span>
          <motion.img
            src={skill.src}
            alt={skill.name}
            title={skill.name}
            className="w-10 h-10 transition-transform duration-300 transform group-hover:scale-110"
            whileHover={{ scale: 1.1 }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SkillsGrid;
