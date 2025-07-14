"use client";

import { BackgroundLines } from "@/components/background-lines";
import RadarDisplay from "@/components/HUD/RadarDisplayProps";
import SkillsGrid from "@/components/HUD/SkillsGrid";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AboutSectionProps {
    className?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ className = "" }) => {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            className={`relative min-h-screen py-16 px-4 sm:px-6 lg:px-8 overflow-hidden mt-10 ${className}`}
        >
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-5xl md:max-w-6xl lg:max-w-7xl pointer-events-none mt-14 md:mt-0 select-none z-0">
                <RadarDisplay />
            </div>

            <BackgroundLines className="relative z-10 mx-auto text-center mt-26 p-6 sm:p-10 bg-transparent">
                <div className="max-w-4xl lg:max-w-5xl mx-auto text-center">
                    <motion.h2
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-black dark:text-white"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        Hi, I'm Abhishek
                    </motion.h2>
                    <motion.p
                        className="text-base sm:text-[17px] lg:text-lg text-gray-700 dark:text-gray-300 pt-4 px-2 sm:px-0"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Currently pursuing Master of Computer Applications, honing skills in
                        modern web technologies and software development. A passionate MERN
                        stack developer specializing in React, Next.js, and scalable
                        backend systems. Focused on creating intelligent, user-centric web
                        platforms.
                    </motion.p>

                    <div
                        ref={ref}
                        className="relative flex justify-center items-center pt-24 sm:pt-76"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="relative group inline-block"
                        >
                            <button className="spark-button cursor-pointer">
                                <span className="spark-glow"></span>
                                <span className="spark-backdrop"></span>
                                <span className="spark-text py-1.5 px-8 sm:py-0.5 sm:px-10 tracking-wide text-sm sm:text-base">
                                    Resume
                                </span>
                            </button>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.6, duration: 0.5 }}
                                className="invisible opacity-0 scale-95 group-hover:visible group-hover:opacity-100 group-hover:scale-100
                                        transition-all duration-300
                                        absolute left-1/2 -translate-x-1/2 mt-2
                                        bg-white border border-gray-200 rounded-lg shadow-lg w-48 z-50
                                        dark:bg-gray-800 dark:border-gray-700"
                            >
                                <ul className="text-sm text-gray-800 dark:text-gray-200 py-1">
                                    <li>
                                        <a
                                            href="/assets/Abhishek_Meena_Resume.pdf"
                                            download
                                            className="block px-4 py-2 hover:bg-gray-100 transition-colors dark:hover:bg-gray-700"
                                        >
                                            Download Resume
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://docs.google.com/document/d/1fWbd5MTpH4Nq9hP2WOv-b9X2FToqGGm_dqoQ32iH6Nk/edit?usp=sharing"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block px-4 py-2 hover:bg-gray-100 transition-colors dark:hover:bg-gray-700"
                                        >
                                            View Online
                                        </a>
                                    </li>
                                </ul>
                            </motion.div>
                        </motion.div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8 sm:gap-8 mt-16 sm:mt-18">
                        <SkillsGrid />
                    </div>
                </div>
            </BackgroundLines>
        </section>
    );
};

export default AboutSection;