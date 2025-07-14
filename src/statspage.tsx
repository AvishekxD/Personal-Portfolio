"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StatCard from "@/components/Stats/StatCard";
import HeatmapCalendar from "@/components/Stats/HeatmapCalendar";
import WeeklyStatsChart from "@/components/Stats/WeeklyStatsChart";
import { subDays, format, addDays } from "date-fns";
import { Tooltip as ReactTooltip } from "react-tooltip";
import UserProfileCard from "@/components/Stats/UserProfileCard";

interface HeatmapValue {
    date: string;
    count: number;
}

type HeatmapType = "leetcode" | "github" | "combined";

interface LeetcodeStats {
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    ranking: number;
    contributionPoints?: number;
}

interface GithubStats {
    totalCommits: number;
    weeklyCommits: Array<{ date: string; count: number }>;
    dailyCommits: Record<string, number>;
}

interface LeetcodeHeatmapApiResponse {
    daily: HeatmapValue[];
    weekly: Array<{ week: string; count: number }>;
}

interface ChartDataPoint {
    label: string;
    leetcode: number;
    github: number;
}

export default function Statspage() {
    const [leetcode, setLeetcode] = useState<LeetcodeStats | null>(null);
    const [github, setGithub] = useState<GithubStats | null>(null);
    const [leetcodeHeatmap, setLeetcodeHeatmap] = useState<HeatmapValue[]>([]);
    const [githubHeatmap, setGithubHeatmap] = useState<HeatmapValue[]>([]);
    const [heatmapType, setHeatmapType] = useState<HeatmapType>("combined");
    const [leetcodeWeekly, setLeetcodeWeekly] = useState<Array<{ week: string, count: number }>>([]);

    const user = {
        username: "avishekxd",
        img: "/assets/avishekxd.png",
        github: "AvishekxD",
        leetcode: "AvishekzZ",
        bio: "The hardest choices require the strongest wills.",
        emoji: "🎈",
    };

    useEffect(() => {
        async function fetchStats() {
            try {
                const [leet, leetMapRes, gitStats, gitMap] = await Promise.all([
                    fetch("/api/leetcode-stats").then(r => r.json()) as Promise<LeetcodeStats>,
                    fetch("/api/leetcode-heatmap").then(r => r.ok ? r.json() : { daily: [], weekly: [] }) as Promise<LeetcodeHeatmapApiResponse>,
                    fetch("/api/github-stats").then(r => r.json()) as Promise<GithubStats>,
                    fetch("/api/github-heatmap").then(r => r.json()) as Promise<HeatmapValue[]>
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

    const { totalLeetcodeLast30Days, totalGithubLast30Days, totalGithubCommitsLastYear } = useMemo(() => {
        const today = new Date();
        const thirtyDaysAgo = subDays(today, 29);

        let leetcodeSumLast30Days = 0;
        let githubSumLast30Days = 0;
        let githubSumLastYear = 0;

        leetcodeHeatmap.forEach(item => {
            const itemDate = new Date(item.date);
            if (itemDate >= thirtyDaysAgo && itemDate <= today) {
                leetcodeSumLast30Days += item.count;
            }
        });

        githubHeatmap.forEach(item => {
            const itemDate = new Date(item.date);
            if (itemDate >= thirtyDaysAgo && itemDate <= today) {
                githubSumLast30Days += item.count;
            }
            githubSumLastYear += item.count;
        });

        return {
            totalLeetcodeLast30Days: leetcodeSumLast30Days,
            totalGithubLast30Days: githubSumLast30Days,
            totalGithubCommitsLastYear: githubSumLastYear,
        };
    }, [leetcodeHeatmap, githubHeatmap]);


    const chartData = useMemo(() => {
        return Array.from({ length: 14 }, (_, i) => {
            const date = subDays(new Date(), 13 - i);
            const dateKey = format(date, "yyyy-MM-dd");

            const leetcodeCount = leetcodeWeekly.find(w => w.week === dateKey)?.count || 0;

            let githubCount = 0;
            if (github?.weeklyCommits) {
                if (Array.isArray(github.weeklyCommits) && github.weeklyCommits.length > 0) {
                    const githubEntry = github.weeklyCommits.find(
                        (entry: { date: string; count: number }) => entry.date === dateKey
                    );
                    githubCount = githubEntry?.count || 0;
                } else if (github.dailyCommits) {
                    githubCount = github.dailyCommits[dateKey] || 0;
                }
            }

            return {
                label: format(date, "MMM d"),
                leetcode: leetcodeCount,
                github: githubCount,
            } as ChartDataPoint;
        });
    }, [leetcodeWeekly, github]);

    const heatmapData = useMemo(() => {
        const today = new Date();
        const oneYearAgo = subDays(today, 365);

        const allDatesMap: Record<string, HeatmapValue> = {};
        let currentDate = new Date(oneYearAgo);
        while (currentDate <= today) {
            const dateString = format(currentDate, 'yyyy-MM-dd');
            allDatesMap[dateString] = { date: dateString, count: 0 };
            currentDate = addDays(currentDate, 1);
        }

        const dataToProcess: HeatmapValue[] =
            heatmapType === "github"
                ? githubHeatmap
                : heatmapType === "leetcode"
                    ? leetcodeHeatmap
                    : [...githubHeatmap, ...leetcodeHeatmap];

        dataToProcess.forEach(({ date, count }) => {
            if (allDatesMap[date]) {
                if (heatmapType === "combined") {
                    allDatesMap[date].count += count;
                } else {
                    allDatesMap[date].count = count;
                }
            }
        });

        return Object.values(allDatesMap).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, [heatmapType, githubHeatmap, leetcodeHeatmap]);

    if (!leetcode || !github || leetcodeHeatmap.length === 0 || githubHeatmap.length === 0) {
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
            className="max-w-[950px] mx-auto px-6 space-y-6 font-mono mt-12 md:mt-0"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
        >
            <div>
                <UserProfileCard user={user} />
            </div>

            <motion.div
                className="bg-zinc-200/10 rounded-2xl max-w-5xl px-6 py-6 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="flex items-center gap-1">
                    <h1 className="text-[19px] font-semibold font-sans tracking-wide mb-1">Statistics</h1>
                    <span
                        data-tooltip-id="info-tooltip"
                        data-tooltip-content="Github activity data is limited to the past 365 days - avishekxd"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="0.75"
                            stroke="currentColor"
                            className="w-4 h-4 text-gray-500 hover:text-zinc-950 transition-colors duration-200 ease-in-out"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
                            />
                        </svg>
                    </span>
                </div>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4"
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                >
                    {[
                        <StatCard key="1" label="LeetCode Solved" value={leetcode.totalSolved} />,
                        <StatCard key="2" label="GitHub Commits" value={totalGithubCommitsLastYear} />,
                        <StatCard key="3" label="Solves (30d)" value={totalLeetcodeLast30Days} />,
                        <StatCard key="4" label="Commits (30d)" value={totalGithubLast30Days} />
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

                <motion.div
                    className="mt-6 bg-white rounded-2xl px-6 py-6 shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
                >
                    <div className="flex justify-between items-center flex-wrap gap-2">
                        <h2 className="text-lg font-semibold font-sans">
                            {heatmapType === "combined"
                                ? "LeetCode + GitHub (Past Year)"
                                : heatmapType === "leetcode"
                                    ? "LeetCode (Past Year)"
                                    : "GitHub (Past Year)"}
                        </h2>
                        <select
                            value={heatmapType}
                            onChange={e => setHeatmapType(e.target.value as HeatmapType)}
                            className="text-sm px-3 py-1 mb-2 rounded-md border bg-gray-50/75 hover:bg-gray-100/75 transition-all duration-300 ease-in focus:outline-none focus:ring-1 focus:ring-gray-200"
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
                        <span className="w-3 h-3 rounded-sm ml-1 bg-[#19ff6555]"></span>
                        <span className="w-3 h-3 rounded-sm ml-1 bg-[#58ef7e]"></span>
                        <span className="w-3 h-3 rounded-sm ml-1 bg-[#3dd759]"></span>
                        <span className="w-3 h-3 rounded-sm ml-1 bg-[#32b441] mr-2"></span>
                        More
                    </div>
                    <ReactTooltip id="heatmap-tooltip" />
                    <ReactTooltip id="info-tooltip" place="top" />
                </motion.div>

                <motion.div
                    className="mt-6 bg-white rounded-2xl px-6 py-6 mb-4 shadow-md"
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