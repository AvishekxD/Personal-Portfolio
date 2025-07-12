// components/HUD/AboutSection.tsx
"use client";

import { BackgroundLines } from "@/components/background-lines";
import RadarDisplay from "@/components/HUD/RafarDisplayProps";
import React from "react";

interface AboutSectionProps {
    className?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ className = "" }) => {
    return (
        <section className={`relative min-h-screen py-16 px-4 overflow-hidden mt-10 ${className}`}>
            {/* Background Radar Layer */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-5xl pointer-events-none select-none z-0">
                <RadarDisplay />
            </div>

            {/* Foreground Bio Content */}
            <BackgroundLines className="relative z-10 mx-auto text-center mt-26 p-10 bg-transparent">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-4 text-black dark:text-white">
                        Hi, I'm Abhishek
                    </h2>
                    <p className="text-[17px] text-gray-700 dark:text-gray-300 pt-4">
                        Currently pursuing Master of Computer Applications, honing skills in modern web technologies and software development.
                        A passionate MERN stack developer specializing in React, Next.js, and scalable backend systems.
                        Focused on creating intelligent, user-centric web platforms.
                    </p>

                    <div className="relative flex justify-center items-center pt-96">
                        <div className="relative inline-block group">
                            <button className="spark-button group">
                                <span className="spark-glow"></span>
                                <span className="spark-backdrop"></span>
                                <span className="spark-text py-0.5 px-10 tracking-wide">Resume</span>
                            </button>

                            {/* Dropup on hover with animation */}
                            <div
                                className="absolute left-1/2 transform -translate-x-1/2 mt-2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-lg w-48 z-50"
                            >
                                <ul className="text-sm text-gray-800 py-1">
                                    <li>
                                        <a
                                        href="/assets/Abhishek_Meena_Resume.pdf"
                                        download
                                        className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                                        >
                                        Download Resume
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                        href="https://docs.google.com/document/d/1fWbd5MTpH4Nq9hP2WOv-b9X2FToqGGm_dqoQ32iH6Nk/edit?usp=sharing"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                                        >
                                        View Online
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </BackgroundLines>
        </section>
    );
};

export default AboutSection;
