"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

export default function WeeklyStatsChart({ data }: { data: any[] }) {
  const animationDelay = 1700;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 1.4 }} 
    >
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 20, right: 30, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
          <XAxis dataKey="label" stroke="#000" fontSize={12} />
          <YAxis stroke="#000" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              fontSize: "12px",
              border: "1px solid #ccc",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
            labelStyle={{ color: "#000", fontWeight: 600 }}
            itemStyle={{ color: "#000" }}
          />
          <Line
            type="monotone"
            dataKey="leetcode"
            stroke="#facc15"
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 1, fill: "#facc15", stroke: "#fff" }}
            isAnimationActive={true}
            animationBegin={animationDelay}
          />
          <Line
            type="monotone"
            dataKey="github"
            stroke="#6e6d6d"
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 1, fill: "#6e6d6d", stroke: "#fff" }}
            isAnimationActive={true}
            animationBegin={animationDelay}
          />
          <Legend wrapperStyle={{ fontSize: "14px", paddingTop: "8px" }} />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
