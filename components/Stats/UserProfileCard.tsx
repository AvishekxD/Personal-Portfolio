"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from 'next/image';

interface TextParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
    alpha: number;
    gravity: number;
    friction: number;
    rotation: number;
    rotationSpeed: number;
    char?: string;
    fontSize: number;
    originalX: number;
    originalY: number;
}

interface User {
    username: string;
    img: string;
    github: string;
    leetcode: string;
    bio: string;
    emoji: string;
}

interface UserProfileCardProps {
    user: User;
}

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const childVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function UserProfileCard({ user }: UserProfileCardProps) {
    const [snapped, setSnapped] = useState(false);
    const [bioSnapped, setBioSnapped] = useState(false);
    const [isReversing, setIsReversing] = useState(false);
    const [isObserving, setIsObserving] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const bioRef = useRef<HTMLDivElement>(null);
    const textParticlesRef = useRef<TextParticle[]>([]);
    const animationFrameIdRef = useRef<number | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const createBioParticles = useCallback(() => {
        if (!canvasRef.current || !bioRef.current) return;

        const bioElement = bioRef.current;
        const bioRect = bioElement.getBoundingClientRect();
        const canvasRect = canvasRef.current.getBoundingClientRect();

        const bioTextElement = bioElement.querySelector('blockquote');
        if (!bioTextElement) return;

        const bioTextRect = bioTextElement.getBoundingClientRect();

        const bioCanvasX = bioTextRect.left - canvasRect.left;
        const bioCanvasY = bioTextRect.top - canvasRect.top;

        const bioText = bioTextElement.textContent || "";
        const colors = ["#4a4a4a", "#6b6b6b", "#8a8a8a", "#2a2a2a", "#1a1a1a", "#3a3a3a"];

        textParticlesRef.current = [];

        const particlesPerChar = 10;
        const totalParticles = bioText.length * particlesPerChar;

        for (let i = 0; i < totalParticles; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 0.6 + 0.2;
            const radius = Math.random() * 0.8 + 0.2;

            const char = bioText[Math.floor(Math.random() * bioText.length)];

            const originalX = bioCanvasX + Math.random() * bioTextRect.width;
            const originalY = bioCanvasY + Math.random() * bioTextRect.height;

            textParticlesRef.current.push({
                x: originalX,
                y: originalY,
                originalX: originalX,
                originalY: originalY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 0.1,
                radius: radius,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: 1,
                gravity: 0.007,
                friction: 0.995,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.03,
                char: Math.random() < 0.3 ? char : undefined,
                fontSize: Math.random() * 2 + 3,
            });
        }

        for (let i = 0; i < 300; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 1.2 + 0.3;
            const radius = Math.random() * 0.4 + 0.1;

            const originalX = bioCanvasX + Math.random() * bioTextRect.width;
            const originalY = bioCanvasY + Math.random() * bioTextRect.height;

            textParticlesRef.current.push({
                x: originalX,
                y: originalY,
                originalX: originalX,
                originalY: originalY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                radius: radius,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: 0.6,
                gravity: 0.005,
                friction: 0.998,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.05,
                fontSize: 0,
            });
        }
    }, []);

    const animateParticles = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (isReversing) {
            textParticlesRef.current.forEach(p => {
                const dx = p.originalX - p.x;
                const dy = p.originalY - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > 0.5) {
                    p.vx = dx * 0.05;
                    p.vy = dy * 0.05;
                    p.x += p.vx;
                    p.y += p.vy;
                }

                p.alpha = Math.min(1, p.alpha + 0.015);
                p.radius = Math.min(p.radius * 1.005, 1.2);
            });
        } else {
            textParticlesRef.current = textParticlesRef.current.filter(p => p.alpha > 0.005);

            textParticlesRef.current.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += p.gravity;
                p.vx *= p.friction;
                p.vy *= p.friction;
                p.alpha -= 0.002;
                p.radius *= 0.9995;
                p.rotation += p.rotationSpeed;
            });
        }

        textParticlesRef.current.forEach(p => {
            ctx.globalAlpha = Math.max(0, p.alpha);

            if (p.char && p.fontSize > 0) {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);
                ctx.font = `${p.fontSize}px serif`;
                ctx.fillStyle = p.color;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(p.char, 0, 0);
                ctx.restore();
            } else {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            }
        });

        ctx.globalAlpha = 1;

        if (textParticlesRef.current.length > 0 || isReversing) {
            animationFrameIdRef.current = requestAnimationFrame(animateParticles);
        } else {
            animationFrameIdRef.current = null;
        }
    }, [isReversing]);

    const handleBioHover = () => {
        if (bioSnapped || isObserving) return;

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setIsObserving(true);

        setTimeout(() => {
            setIsObserving(false);
            setBioSnapped(true);
            setIsReversing(false);
            createBioParticles();

            if (animationFrameIdRef.current === null) {
                animationFrameIdRef.current = requestAnimationFrame(animateParticles);
            }

            timeoutRef.current = setTimeout(() => {
                setIsReversing(true);
                setTimeout(() => {
                    setBioSnapped(false);
                    setIsReversing(false);
                    textParticlesRef.current = [];
                }, 2000);
            }, 3400);
        }, 800);
    };

    const handleBioLeave = () => {
        if (bioSnapped || isReversing) return;

        if (isObserving) {
            setIsObserving(false);
        }

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.offsetWidth;
                canvas.height = parent.offsetHeight;
            }
        }

        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                if (entry.target === canvas) {
                    canvas.width = entry.contentRect.width;
                    canvas.height = entry.contentRect.height;
                }
            }
        });

        if (canvas) {
            resizeObserver.observe(canvas);
        }

        return () => {
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            if (canvas) {
                resizeObserver.unobserve(canvas);
            }
        };
    }, []);

    return (
        <div className="w-full z-10 max-w-[950px] bg-zinc-200/10 rounded-2xl px-14 py-10 flex justify-between items-center shadow-md flex-col sm:flex-row gap-6 sm:gap-0 relative overflow-hidden">

            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
            />

            <motion.div
                className="flex flex-col md:flex-row text-center md:text-start items-center gap-4 z-20"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                 <motion.div variants={childVariants} className="relative w-24 h-24 rounded-full shadow-md shadow-zinc-400 hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out">
                    <Image
                        src={user.img}
                        alt="profile"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                        priority
                    />
                </motion.div>

                <motion.div variants={childVariants}>
                    <motion.h2
                        variants={childVariants} 
                        className="text-xl mt-2 font-semibold font-mono"
                    >
                        {user.username}
                    </motion.h2>

                    <motion.div
                        variants={childVariants} 
                        className="flex flex-col text-sm text-gray-500"
                    >
                        <a
                            href={`https://github.com/${user.github}`}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline"
                        >
                            GitHub: {user.github}
                        </a>
                        <a
                            href={`https://leetcode.com/${user.leetcode}`}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline"
                        >
                            LeetCode: {user.leetcode}
                        </a>
                    </motion.div>
                </motion.div>
            </motion.div>

            <div className="text-right max-w-[220px] mt-2 z-20">
                <h3 className="text-xs text-gray-600 pt-1 text-center md:text-start">Bio</h3>
                <div
                    ref={bioRef}
                    className="hover:bg-zinc-100/20 rounded-lg transition-colors duration-300 relative"
                    onMouseEnter={handleBioHover}
                    onMouseLeave={handleBioLeave}
                >
                    <div>
                        <div>
                            <AnimatePresence mode="wait">
                                {!bioSnapped ? (
                                    <motion.blockquote
                                        key="bio-shown"
                                        className="text-[15px] italic font-sans font-medium text-start text-zinc-800 leading-relaxed w-full"
                                        initial={{ opacity: 1, scale: 1 }}
                                        animate={{
                                            opacity: isObserving ? 0.7 : 1,
                                            scale: isObserving ? 0.95 : 1
                                        }}
                                        exit={{
                                            opacity: 0,
                                            scale: 0.9,
                                            transition: { duration: 0.2 }
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {user.bio}
                                    </motion.blockquote>
                                ) : (
                                    <motion.div
                                        key="bio-hidden"
                                        className="text-[15px] italic font-sans font-medium text-start text-zinc-800 leading-relaxed w-full"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0 }}
                                    >
                                        {user.bio}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div >
                            <div className="flex justify-end mr-3">
                                <blockquote className="italic text-sm text-zinc-600">
                                    — Thanos
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}