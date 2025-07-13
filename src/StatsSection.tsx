"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StatCard from "@/components/Stats/StatCard";
import HeatmapCalendar from "@/components/Stats/HeatmapCalendar";
import WeeklyStatsChart from "@/components/Stats/WeeklyStatsChart";
import { subDays, format } from "date-fns";
import { Tooltip as ReactTooltip } from "react-tooltip";

type HeatmapType = "leetcode" | "github" | "combined";

export default function StatsPage() {
    const [leetcode, setLeetcode] = useState<any>(null);
    const [github, setGithub] = useState<any>(null);
    const [heatmapType, setHeatmapType] = useState<HeatmapType>("combined");

    useEffect(() => {
        const fetchStats = async () => {
            const leet = await fetch("/api/leetcode-stats").then((res) => res.json());
            const git = await fetch("/api/github-stats").then((res) => res.json());
            setLeetcode(leet);
            setGithub(git);
        };
        fetchStats();
    }, []);

    const chartData = useMemo(() => {
        return Array.from({ length: 14 }, (_, i) => ({
            label: format(subDays(new Date(), 13 - i), "MMM d"),
            leetcode: Math.floor(Math.random() * 5),
            github: github?.weeklyCommits[i % github.weeklyCommits.length] || 0,
        }));
    }, [github]);

    const heatmapData = useMemo(() => {
        return Array.from({ length: 365 }, (_, i) => {
            const date = format(subDays(new Date(), i), "yyyy-MM-dd");
            const countA = heatmapType === "leetcode" || heatmapType === "combined" ? Math.floor(Math.random() * 3) : 0;
            const countB = heatmapType === "github" || heatmapType === "combined" ? Math.floor(Math.random() * 3) : 0;
            return {
                date,
                count: countA + countB,
            };
        });
    }, [heatmapType]);

    if (!leetcode || !github) {
        return (
            <motion.div
                className="p-12 flex justify-center items-center gap-2"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: 0.2,
                            repeat: Infinity,
                            repeatType: "loop",
                        },
                    },
                }}
            >
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-3 h-3 bg-black rounded-full"
                        variants={{
                            hidden: { y: 0, opacity: 0.4 },
                            visible: {
                                y: [0, -8, 0],
                                opacity: [0.4, 1, 0.4],
                            },
                        }}
                        transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            repeatDelay: 0.2,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </motion.div>
        );
    }

    return (
        <motion.div
            className="max-w-[950px] mx-auto px-6 space-y-6 font-mono"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: 0.3,
                    },
                },
            }}
        >
            <motion.div
                className="bg-zinc-200/10 rounded-2xl max-w-5xl px-6 py-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <h1 className="text-lg font-semibold font-sans tracking-wide">Statistics</h1>

                {/* Cards */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: { staggerChildren: 0.15 },
                        },
                    }}
                >
                    {[
                        <StatCard key="1" label="LeetCode Solved" value={leetcode.totalSolved} />,
                        <StatCard key="2" label="GitHub Commits" value={github.totalCommits} />,
                        <StatCard key="3" label="Rank" value={`#${leetcode.ranking}`} />,
                        <StatCard key="4" label="Points" value={leetcode.contributionPoints} />
                    ].map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.15 }}
                        >
                            {card}
                        </motion.div>
                    ))}
                </motion.div>

                {/* Heatmap */}
                <motion.div
                    className="mt-6 bg-white rounded-2xl px-6 py-6 shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
                >
                    <div className="flex justify-between items-center flex-wrap gap-2">
                        <h2 className="text-lg font-semibold font-sans">
                            {heatmapType === "combined"
                                ? "LeetCode + GitHub Heatmap (Past Year)"
                                : heatmapType === "leetcode"
                                    ? "LeetCode Heatmap (Past Year)"
                                    : "GitHub Heatmap (Past Year)"}
                        </h2>
                        <select
                            value={heatmapType}
                            onChange={(e) => setHeatmapType(e.target.value as HeatmapType)}
                            className="text-sm px-3 py-1 rounded-md border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        >
                            <option value="combined">LeetCode + GitHub</option>
                            <option value="leetcode">LeetCode</option>
                            <option value="github">GitHub</option>
                        </select>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={heatmapType}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <HeatmapCalendar values={heatmapData} />
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex justify-end items-center gap-1 mt-4 text-xs md:text-sm px-2">
                        <span className="flex items-center">Less
                            <span className="w-3 h-3 rounded-sm bg-[#f5f5f5] ml-2"></span>
                        </span>
                        <span className="flex items-center">
                            <span className="w-3 h-3 rounded-sm ml-1 bg-[#19ff6555]"></span>
                        </span>
                        <span className="flex items-center">
                            <span className="w-3 h-3 rounded-sm ml-1 bg-[#58ef7e]"></span>
                        </span>
                        <span className="flex items-center">
                            <span className="w-3 h-3 rounded-sm ml-1 bg-[#3dd759]"></span>
                        </span>
                        <span className="flex items-center">
                            <span className="w-3 h-3 rounded-sm ml-1 bg-[#32b441] mr-2"></span>
                            More
                        </span>
                    </div>
                    <ReactTooltip id="heatmap-tooltip" />
                    <ReactTooltip id="info-tooltip" place="top" />
                </motion.div>

                {/* Weekly Chart */}
                <motion.div
                    className="mt-6 bg-white rounded-2xl px-6 py-6 shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 1.4 }}
                >
                    <h2 className="text-lg font-semibold mb-2 font-sans">Weekly Activity</h2>
                    <WeeklyStatsChart data={chartData} />
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
