"use client";

import React from "react";
interface ContactProps {
  className?: string;
}

const Contact: React.FC<ContactProps> = ({ className = '' }) => {
    return(
        <section className={`min-h-screen py-16 px-4 ${className}`}>
            <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
                <div className="bg-gray-100 px-12 py-6 rounded-xl hover:scale-110 shadow-lg shadow-zinc-400 hover:shadow-xl hover:shadow-zinc-300 transition-all duration-400 ease-in-out ">
                    Under construction...
                </div>
            </div>
        </section>
    );
};

export default Contact;
