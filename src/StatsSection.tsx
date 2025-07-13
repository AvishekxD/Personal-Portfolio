"use client";

import React from "react";
interface StatsSectionProps {
  className?: string;
}

const StatsSection: React.FC<StatsSectionProps> = ({ className = '' }) => {
    return(
        <section className={`min-h-screen py-16 px-4 ${className}`}>
            <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
                
            </div>
        </section>
    );
};

export default StatsSection;
