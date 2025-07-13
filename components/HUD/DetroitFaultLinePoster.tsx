"use client";

import React, { useEffect, useState } from "react";

const DetroitFaultLinePoster = () => {
    const [currentTime, setCurrentTime] = useState("");
    const [formattedDateAndYear, setFormattedDateAndYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState(1);

    // Get date info only on client
    useEffect(() => {
        const now = new Date();

        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const timeString = `${hours}.${minutes}`;

        const date = now.getDate();
        const yearShort = String(now.getFullYear()).slice(-2);
        const dateYearString = `${date}-${yearShort}`;
        const monthName = now.toLocaleString("en-US", { month: "long" }).toUpperCase();

        setCurrentTime(timeString);
        setFormattedDateAndYear(dateYearString);
        setMonth(monthName);
        setDay(date);
    }, []);

    const ordinalSuffix = (d: number) => {
        if (d > 3 && d < 21) return "TH";
        switch (d % 10) {
            case 1: return "ST";
            case 2: return "ND";
            case 3: return "RD";
            default: return "TH";
        }
    };

    return (
        <div className="will-change-transform relative max-w-xl z-10 -top-8 sm:-top-12 md:-top-15 p-3 right-1/10 pl-8 md:pl-0 md:left-1/6">
            <svg
                viewBox="0 0 550 250"
                className="w-full h-auto"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Header Text */}
                <text x="20" y="25" fontSize="16" fontWeight="bold" fill="black">
                    DETROIT FAULT LINE
                </text>

                {/* Top Left Text Block */}
                <text x="20" y="45" fontSize="7" fill="black">
                    DECIMAL SEPARATION AND
                </text>
                <text x="20" y="54" fontSize="7" fill="black">
                    PROPERTIES OF POLYMER 48
                </text>

                {/* Top Center Text Block */}
                <text x="160" y="45" fontSize="7" fill="black">
                    REGULATORY COMMITTEE
                </text>
                <text x="160" y="54" fontSize="7" fill="black">
                    THE CITY OF DETROIT
                </text>

                {/* Top Right Text Block */}
                <text x="320" y="45" fontSize="7" fill="black">
                    NOVEMBER 2016
                </text>

                <line x1="20" y1="80" x2="570" y2="80" stroke="#000" strokeWidth="0.5" />

                {/* Main Title */}
                <text x="20" y="131" fontSize="68" fontWeight="1100" fill="black" letterSpacing="2px">
                    PROJECTS
                </text>

                {/* Right Side Text */}
                <text x="350" y="105" fontSize="24" fill="black">
                    K-
                </text>
                <text x="350" y="125" fontSize="16" fill="black">
                    ROS
                </text>
                <text x="350" y="140" fontSize="16" fill="black">
                    48
                </text>

                {/* Bottom Left Text Block */}
                <text x="20" y="180" fontSize="7" fill="black">
                    DESIGN BUILD &
                </text>
                <text x="20" y="189" fontSize="7" fill="black">
                    LECTURE SERIES
                </text>

                {/* Bottom Center Text Block */}
                <text x="160" y="180" fontSize="7" fill="black">
                    FAZE RAIN
                </text>

                <line x1="20" y1="205" x2="230" y2="205" stroke="#000" strokeWidth="0.5" />

                {/* Dynamic Date Text */}
                <text x="20" y="220" fontSize="16" fill="black">
                    {month} {day}
                </text>
                <text x="81" y="215" fontSize="8" fill="black">
                    {ordinalSuffix(day)}
                </text>
                <text x="125" y="220" fontSize="16" fontWeight="bold" fill="black">
                    -
                </text>

                <text x="20" y="245" fontSize="16" fill="black">
                    {currentTime}/{formattedDateAndYear}
                </text>
                <text x="160" y="240" fontSize="8" fill="black">
                    TIME&YEAR
                </text>

                {/* Decorative Elements */}
                <path d="M 300 160 L 320 160 L 320 180 L 300 180 Z" fill="none" stroke="black" strokeWidth="1" />
                <path d="M 305 165 L 315 165 L 315 175 L 305 175 Z" fill="black" />
                <circle cx="280" cy="200" r="3" fill="black" />
                <circle cx="290" cy="210" r="2" fill="none" stroke="black" strokeWidth="1" />
                <path d="M 250 180 L 280 200" stroke="black" strokeWidth="1" />

                {/* Grid pattern */}
                <g transform="translate(320, 200)">
                    {Array.from({ length: 4 }, (_, i) => (
                        <g key={i}>
                            <line x1="0" y1={i * 8} x2="40" y2={i * 8} stroke="black" strokeWidth="0.5" opacity="0.3" />
                            <line x1={i * 10} y1="0" x2={i * 10} y2="24" stroke="black" strokeWidth="0.5" opacity="0.3" />
                        </g>
                    ))}
                </g>
            </svg>
        </div>
    );
};

export default DetroitFaultLinePoster;
