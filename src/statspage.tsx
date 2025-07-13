"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StatCard from "@/components/Stats/StatCard";
import HeatmapCalendar from "@/components/Stats/HeatmapCalendar";
import WeeklyStatsChart from "@/components/Stats/WeeklyStatsChart";
import { subDays, format } from "date-fns";
import { Tooltip as ReactTooltip } from "react-tooltip";

type HeatmapType = "leetcode" | "github" | "combined";

export default function Statspage() {
    const [leetcode, setLeetcode] = useState<any>(null);
    const [github, setGithub] = useState<any>(null);
    const [leetcodeHeatmap, setLeetcodeHeatmap] = useState<any[]>([]);
    const [githubHeatmap, setGithubHeatmap] = useState<any[]>([]);
    const [heatmapType, setHeatmapType] = useState<HeatmapType>("combined");
    const [leetcodeWeekly, setLeetcodeWeekly] = useState<{ week: string, count: number }[]>([]);

    const user = {
        username: "avishekxd",
        img: "/assets/avishekxd.png",
        github: "AvishekxD",
        leetcode: "AvishekzZ",
        bio: "I begin to take control as the sun rises over.",
        emoji: "🎈",
    };


    useEffect(() => {
        async function fetchStats() {
            try {
                const [leet, leetMapRes, gitStats, gitMap] = await Promise.all([
                    fetch("/api/leetcode-stats").then(r => r.json()),
                    fetch("/api/leetcode-heatmap").then(r => r.ok ? r.json() : { daily: [], weekly: [] }),
                    fetch("/api/github-stats").then(r => r.json()),
                    fetch("/api/github-heatmap").then(r => r.json())
                ]);

                setLeetcode(leet);
                setGithub(gitStats);
                setLeetcodeHeatmap(Array.isArray(leetMapRes.daily) ? leetMapRes.daily : []);
                setLeetcodeWeekly(Array.isArray(leetMapRes.weekly) ? leetMapRes.weekly : []);
                setGithubHeatmap(Array.isArray(gitMap) ? gitMap : []);
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        }
        fetchStats();
    }, []);

    const chartData = useMemo(() => {
        return Array.from({ length: 14 }, (_, i) => {
            const date = subDays(new Date(), 13 - i);
            const dateKey = format(date, "yyyy-MM-dd");

            const leetcodeCount = leetcodeWeekly.find(w => w.week === dateKey)?.count || 0;

            let githubCount = 0;
            if (github?.weeklyCommits) {
                if (Array.isArray(github.weeklyCommits) && github.weeklyCommits.length > 0) {
                    const githubEntry = github.weeklyCommits.find((entry: any) => entry.date === dateKey);
                    githubCount = githubEntry?.count || 0;
                } else if (github.dailyCommits) {
                    githubCount = github.dailyCommits[dateKey] || 0;
                }
            }

            return {
                label: format(date, "MMM d"),
                leetcode: leetcodeCount,
                github: githubCount,
            };
        });
    }, [leetcodeWeekly, github]);

    const heatmapData = useMemo(() => {
        if (heatmapType === "github") return githubHeatmap;
        if (heatmapType === "leetcode") return leetcodeHeatmap;

        const mergedMap: Record<string, number> = {};

        githubHeatmap.forEach(({ date, count }) => {
            mergedMap[date] = (mergedMap[date] || 0) + count;
        });

        leetcodeHeatmap.forEach(({ date, count }) => {
            mergedMap[date] = (mergedMap[date] || 0) + count;
        });

        return Object.entries(mergedMap)
            .map(([date, count]) => ({ date, count }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, [heatmapType, githubHeatmap, leetcodeHeatmap]);

    if (!leetcode || !github || leetcodeHeatmap.length === 0) {
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
                {[0, 1, 2].map(i => (
                    <motion.div
                        key={i}
                        className="w-3 h-3 bg-black rounded-full"
                        variants={{
                            hidden: { y: 0, opacity: 0.4 },
                            visible: { y: [0, -8, 0], opacity: [0.4, 1, 0.4] },
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
            variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
        >   
            <div className="w-full max-w-[950px] bg-zinc-200/10 rounded-2xl px-14 py-10 flex justify-between items-center shadow-md flex-col sm:flex-row gap-6 sm:gap-0">
                <div className="flex items-center gap-4">
                    <img
                        src={user.img}
                        alt="profile"
                        className="w-24 h-24 rounded-full object-cover shadow-md shadow-zinc-400 hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
                    />
                    <div>
                        <h2 className="text-xl mt-2 font-semibold font-mono">{user.username}</h2>
                        <div className=" flex flex-col text-sm text-gray-500">
                            <a
                                href={`https://github.com/${user.github}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                            GitHub: {user.github}
                            </a>
                            <a
                                href={`https://leetcode.com/${user.leetcode}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                            LeetCode: {user.leetcode}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Section - Bio */}
                <div className="text-right max-w-[220px]">
                    <h3 className="text-xs text-gray-500 mb-1 text-justify">Bio</h3>
                    <p className="text-[15px] italic font-sans font-medium tracking-tight text-justify">
                        {user.bio}
                    </p>
                </div>
                </div>


            <motion.div
                className="bg-zinc-200/10 rounded-2xl max-w-5xl px-6 py-6 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >   
                <h1 className="text-lg font-semibold font-sans tracking-wide">Statistics</h1>

                {/* Stat Cards */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4"
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                >
                    {[
                        <StatCard key="1" label="LeetCode Solved" value={leetcode.totalSolved} />,
                        <StatCard key="2" label="GitHub Commits" value={github.totalCommits} />,
                        <StatCard key="3" label="Rank" value={`#${leetcode.ranking}`} />,
                        <StatCard key="4" label="Points" value={leetcode.contributionPoints} />
                    ].map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.15 }}
                        >
                            {card}
                        </motion.div>
                    ))}
                </motion.div>

                {/* Heatmap Section */}
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
                            onChange={e => setHeatmapType(e.target.value as HeatmapType)}
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

                    {/* Legend */}
                    <div className="flex justify-end items-center gap-1 mt-4 text-xs md:text-sm px-2">
                        <span className="flex items-center">Less
                            <span className="w-3 h-3 rounded-sm bg-[#f5f5f5] ml-2"></span>
                        </span>
                        <span className="w-3 h-3 rounded-sm ml-1 bg-[#19ff6555]"></span>
                        <span className="w-3 h-3 rounded-sm ml-1 bg-[#58ef7e]"></span>
                        <span className="w-3 h-3 rounded-sm ml-1 bg-[#3dd759]"></span>
                        <span className="w-3 h-3 rounded-sm ml-1 bg-[#32b441] mr-2"></span>
                        More
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