"use client";

import React, { useEffect, useRef, useState } from "react";
const FlexibleDesignComponent = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [time, setTime] = useState<{ hours: number; minutes: number }>({
    hours: 0,
    minutes: 0,
  });
  const [hasMounted, setHasMounted] = useState(false);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    setHasMounted(true);

    const update = () => {
      const now = new Date();
      setSeconds(now.getSeconds());
      setTime({ hours: now.getHours(), minutes: now.getMinutes() });
      requestRef.current = requestAnimationFrame(update);
    };

    update();

    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  if (!hasMounted) return null; // Prevent hydration error

  const current = seconds;
  const prev = (seconds + 59) % 60;
  const next = (seconds + 1) % 60;
  const rotation = current * 6;

  const { hours, minutes } = time;
  const hourDeg = (hours % 12 + minutes / 60) * 30;
  const minDeg = minutes * 6;

  return (
    <div className="w-full max-w-[140px] mx-auto p-4 md:p-8 min-h-[120px]">
      <svg
        viewBox="0 0 300 600"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Vertical Path */}
        <path
          d="M 50 0 Q 80 150 60 300 Q 40 450 70 600"
          stroke="#d0d0d0"
          strokeWidth="1"
          fill="none"
        />

        {/* Top Circles - Prev / Curr / Next */}
        <g transform="translate(120, 80)">
          {/* Previous - Hour */}
          <circle cx="-15" cy="-23" r="12" fill="#999" />
          <text
            x="-15"
            y="-19"
            fontSize="12"
            fontWeight="700"
            fill="white"
            textAnchor="middle"
          >
            {`${hours.toString().padStart(2, "0")}`}
          </text>

          {/* Current - Minute */}
          <circle cx="0" cy="0" r="12" fill="#999" />
          <text
            x="0"
            y="4"
            fontSize="12"
            fontWeight="700"
            fill="white"
            textAnchor="middle"
          >
            {`${minutes.toString().padStart(2, "0")}`}
          </text>

          {/* Next - Second (prev) */}
          <circle cx="25" cy="-10" r="12" fill="#999" />
          <text
            x="25"
            y="-6"
            fontSize="12"
            fontWeight="700"
            fill="white"
            textAnchor="middle"
          >
            {prev.toString().padStart(2, "0")}
          </text>
        </g>

        {/* Dot on curve */}
        <circle cx="66" cy="120" r="2" fill="#666" />

        {/* Clock Face */}
        <g transform="translate(100, 200)">
          {/* Tick Marks */}
          {Array.from({ length: 60 }, (_, i) => {
            const angle = (i * 6 - 90) * (Math.PI / 180);
            const isHour = i % 5 === 0;
            const inner = isHour ? 35 : 38;
            const outer = isHour ? 45 : 42;
            const x1 = Math.cos(angle) * inner;
            const y1 = Math.sin(angle) * inner;
            const x2 = Math.cos(angle) * outer;
            const y2 = Math.sin(angle) * outer;

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#d0d0d0"
                strokeWidth={isHour ? "1.5" : "0.5"}
              />
            );
          })}

          {/* Hour Hand */}
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="-20"
            stroke="#999"
            strokeWidth="2"
            transform={`rotate(${(hours % 12 + minutes / 60) * 30})`}

          />

          {/* Minute Hand */}
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="-28"
            stroke="#888"
            strokeWidth="1.5"
            transform={`rotate(${minutes * 6})`}
          />

          {/* Second Hand */}
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="-35"
            stroke="#333"
            strokeWidth="1"
            transform={`rotate(${rotation})`}
          />

          {/* Clock Center */}
          <circle cx="0" cy="0" r="35" stroke="#d0d0d0" strokeWidth="1" fill="none" />
          <circle cx="0" cy="0" r="2" fill="#333" />
        </g>

        {/* Center Text */}
        <g transform="translate(110, 250)">
          <text
            x="0"
            y="0"
            fontSize="48"
            fontWeight="900"
            fill="#333"
            fontFamily="Arial Black, sans-serif"
          >
            {current.toString().padStart(2, "0")}
          </text>
          <text
            x="63"
            y="-20"
            fontSize="14"
            fontWeight="700"
            fill="#333"
            fontFamily="Arial, sans-serif"
          >
            Flexible
          </text>
          <text
            x="63"
            y="-5"
            fontSize="10"
            fontWeight="400"
            fill="#666"
            fontFamily="Arial, sans-serif"
          >
            Crafted pixel-perfect,
          </text>
          <text
            x="63"
            y="8"
            fontSize="10"
            fontWeight="400"
            fill="#666"
            fontFamily="Arial, sans-serif"
          >
            By AvishekxD
          </text>
        </g>

        {/* Lower Dot */}
        <circle cx="55" cy="350" r="2" fill="#666" />

        {/* Bottom Rotated Number */}
        <g transform="translate(80, 480)">
          <text
            x="0"
            y="0"
            fontSize="48"
            fontWeight="900"
            fill="#999"
            fontFamily="Arial Black, sans-serif"
            transform="rotate(-15)"
          >
            {next.toString().padStart(2, "0")}
          </text>
        </g>

        {/* Vertical Progress Line */}
        <line
          x1="150"
          y1="80"
          x2="150"
          y2={80 + current * 5}
          stroke="#aaa"
          strokeWidth="1"
          strokeDasharray="2"
        />

        {/* Decorative Rings */}
        <g transform="translate(200, 120)">
          <circle cx="0" cy="0" r="8" fill="none" stroke="#d0d0d0" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="1" fill="#999" />
        </g>
        <g transform="translate(220, 350)">
          <circle cx="0" cy="0" r="6" fill="none" stroke="#d0d0d0" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="1" fill="#999" />
        </g>
        <g transform="translate(180, 480)">
          <circle cx="0" cy="0" r="4" fill="none" stroke="#d0d0d0" strokeWidth="0.5" />
        </g>

        {/* Light Grid */}
        <g opacity="0.1">
          {Array.from({ length: 10 }, (_, i) => (
            <line
              key={`h${i}`}
              x1="0"
              y1={i * 60}
              x2="300"
              y2={i * 60}
              stroke="#999"
              strokeWidth="0.5"
            />
          ))}
          {Array.from({ length: 5 }, (_, i) => (
            <line
              key={`v${i}`}
              x1={i * 60}
              y1="0"
              x2={i * 60}
              y2="600"
              stroke="#999"
              strokeWidth="0.5"
            />
          ))}
        </g>

        {/* Connectors */}
        <line
          x1="132"
          y1="92"
          x2="110"
          y2="165"
          stroke="#d0d0d0"
          strokeWidth="0.5"
          opacity="0.5"
        />
        <line
          x1="110"
          y1="285"
          x2="80"
          y2="445"
          stroke="#d0d0d0"
          strokeWidth="0.5"
          opacity="0.5"
        />

        {/* Accent Lines */}
        <g stroke="#d0d0d0" strokeWidth="0.5">
          <line x1="40" y1="50" x2="50" y2="60" />
          <line x1="250" y1="200" x2="260" y2="210" />
          <line x1="30" y1="400" x2="40" y2="410" />
          <line x1="240" y1="550" x2="250" y2="560" />
        </g>
      </svg>
    </div>
  );
};

export default FlexibleDesignComponent;
