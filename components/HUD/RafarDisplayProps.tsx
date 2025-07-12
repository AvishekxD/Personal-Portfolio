"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface RadarDisplayProps {
  className?: string;
}

const RadarDisplay: React.FC<RadarDisplayProps> = ({ className = '' }) => {
  const initialNumbers = {
    lf: 7.2,
    stlLeft: 275,
    degLeft: 153,
    valLeft: 32,
    apc: 342,
    rf: 8.6,
    stlRight: 268,
    degRight: 126,
    valRight: 20,
    centerTopDeg: 23.12,
    centerLeftDeg: 24.98,
    centerRightDeg: 23.32,
  };

  const strokeColor = "#333";
  const strokeWidth = 2;

  const [dynamicNumbers, setDynamicNumbers] = useState(initialNumbers);

  const svgRef = useRef<SVGSVGElement>(null);
  const triggerRef = useRef(null);
  const isInView = useInView(triggerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const handleScroll = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        const componentTopAbsolute = rect.top + window.scrollY;
        const componentHeight = rect.height;

        const activationStartScroll = componentTopAbsolute - window.innerHeight * 0.7;
        const activationEndScroll = componentTopAbsolute + componentHeight - window.innerHeight * 0.3;

        let progress = 0;
        if (window.scrollY < activationStartScroll) {
          progress = 0;
        } else if (window.scrollY > activationEndScroll) {
          progress = 1;
        } else {
          progress = (window.scrollY - activationStartScroll) / (activationEndScroll - activationStartScroll);
        }

        progress = Math.max(0, Math.min(1, progress));

        setDynamicNumbers(prevNumbers => {
          const newNumbers = { ...initialNumbers };

          const interpolate = (start: number, end: number, progress: number, decimalPlaces: number = 0) => {
            const value = start + (end - start) * progress;
            return parseFloat(value.toFixed(decimalPlaces));
          };

          newNumbers.lf = interpolate(7.0, 7.5, progress, 1);
          newNumbers.stlLeft = interpolate(250, 300, progress, 0);
          newNumbers.degLeft = interpolate(140, 170, progress, 0);
          newNumbers.valLeft = interpolate(25, 40, progress, 0);

          newNumbers.apc = interpolate(300, 400, progress, 0);

          newNumbers.rf = interpolate(8.0, 9.0, progress, 1);
          newNumbers.stlRight = interpolate(240, 290, progress, 0);
          newNumbers.degRight = interpolate(110, 140, progress, 0);
          newNumbers.valRight = interpolate(15, 30, progress, 0);

          newNumbers.centerTopDeg = interpolate(22.0, 24.5, progress, 2);
          newNumbers.centerLeftDeg = interpolate(23.5, 26.5, progress, 2);
          newNumbers.centerRightDeg = interpolate(22.0, 25.0, progress, 2);

          return newNumbers;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isInView]);

  return (
    <div
      ref={triggerRef}
      className={`w-full max-w-5xl mx-auto flex justify-center items-center ${className}`}
    >
      <motion.svg
        ref={svgRef}
        viewBox="0 0 600 600"
        className="w-full h-auto"
        style={{ backgroundColor: 'transparent' }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Top Labels */}
        <text x="30" y="35" className="text-[6px] font-bold fill-black">LF {dynamicNumbers.lf.toFixed(1)}</text>
        <text x="30" y="45" className="text-[6px] fill-gray-600">STL {dynamicNumbers.stlLeft}</text>
        <text x="30" y="55" className="text-[6px] fill-gray-600">{dynamicNumbers.degLeft}° / {dynamicNumbers.valLeft}</text>

        <text x="245" y="35" className="text-[6px] font-bold fill-gray-500">APC</text>
        <rect x="280" y="23" width="40" height="20" fill="none" stroke="#999" strokeWidth="0.5" />
        <text x="300" y="35" className="text-[6px] font-bold fill-black" textAnchor="middle">{dynamicNumbers.apc}</text>
        <text x="345" y="35" className="text-[6px] font-bold fill-gray-500">LDS</text>

        <text x="520" y="35" className="text-[6px] font-bold fill-black">RF {dynamicNumbers.rf.toFixed(1)}</text>
        <text x="520" y="45" className="text-[6px] fill-gray-600">STL {dynamicNumbers.stlRight}</text>
        <text x="520" y="55" className="text-[6px] fill-gray-600">{dynamicNumbers.degRight}° / {dynamicNumbers.valRight}</text>

        <motion.g
          transform="translate(280, 320)"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {/* Dots */}
          {[-78, -68, -58, -1].map((cx, i) => (
            <motion.circle
              key={cx}
              cx={cx}
              cy="0"
              r="3"
              fill={strokeColor}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 1 + i * 0.1 }}
            />
          ))}

          {/* Dashes and extras */}
          <line x1="-40" y1="0" x2="-15" y2="0" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
          <line x1="10" y1="0" x2="27" y2="0" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
          <circle cx="22" cy="0" r="28" fill="none" stroke="#000" strokeWidth="1" strokeDasharray="1 3" />
          <line x1="35" y1="0" x2="55" y2="0" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
          <circle cx="63" cy="0" r="3" fill={strokeColor} />
          <circle cx="42" cy="-19.5" r="2" fill="none" strokeWidth="0.5" stroke={strokeColor} />
          <circle cx="2" cy="19.5" r="2" fill="none" strokeWidth="0.5" stroke={strokeColor} />
          <line x1="72" y1="0" x2="94" y2="0" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
          <line x1="101" y1="0" x2="115" y2="0" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
          <line x1="-24" y1="5" x2="10" y2="5" stroke="#000" strokeWidth="1" strokeLinecap="round" />
          <line x1="-44" y1="7.5" x2="-10" y2="7.5" stroke="#000" strokeWidth="1" strokeLinecap="round" />
          <line x1="40" y1="-5" x2="80" y2="-5" stroke="#000" strokeWidth="1" strokeLinecap="round" />
          <line x1="60" y1="-7.5" x2="95" y2="-7.5" stroke="#000" strokeWidth="1" strokeLinecap="round" />
        </motion.g>
      </motion.svg>
    </div>
  );
};

export default RadarDisplay;
