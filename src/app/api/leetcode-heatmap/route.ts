import { NextResponse } from "next/server";
import { startOfWeek, formatISO, parseISO } from "date-fns";

export async function GET() {
    const username = process.env.LEETCODE_USERNAME || "AvishekzZ";

    const query = `
    query userProfileCalendar($username: String!) {
      matchedUser(username: $username) {
        userCalendar {
          submissionCalendar
        }
      }
    }
  `;

    try {
        const res = await fetch("https://leetcode.com/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Referer": "https://leetcode.com",
            },
            body: JSON.stringify({
                query,
                variables: { username },
            }),
            next: { revalidate: 1800 },
        });

        if (!res.ok) {
            console.error(`Failed to fetch from LeetCode GraphQL: Status ${res.status} - ${res.statusText}`);
            return NextResponse.json({ error: "Failed to fetch from LeetCode", details: `Status: ${res.status}, Message: ${res.statusText}` }, { status: res.status });
        }

        const data = await res.json();

        if (!data.data || !data.data.matchedUser || !data.data.matchedUser.userCalendar || typeof data.data.matchedUser.userCalendar.submissionCalendar !== 'string') {
            console.error("LeetCode GraphQL response structure unexpected or submissionCalendar missing/not a string.");
            return NextResponse.json({
                error: "Unexpected LeetCode GraphQL response structure or missing data",
                details: data
            }, { status: 500 });
        }

        const raw = JSON.parse(data.data.matchedUser.userCalendar.submissionCalendar);

        const daily = Object.entries(raw).map(([timestamp, count]) => ({
            date: new Date(Number(timestamp) * 1000).toISOString().split("T")[0],
            count: Number(count),
        }));

        const weeklyMap: Record<string, number> = {};
        daily.forEach(({ date, count }) => {
            const week = startOfWeek(parseISO(date)).toISOString().split("T")[0];
            weeklyMap[week] = (weeklyMap[week] || 0) + count;
        });

        const weekly = Object.entries(weeklyMap)
            .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
            .map(([week, count]) => ({ week, count }));

        return NextResponse.json({
            daily,
            weekly,
        });
    } catch (err: any) {
        console.error("LeetCode API error:", err.message || err);
        return NextResponse.json({ error: "Unexpected server error", details: err.message || "Unknown error" }, { status: 500 });
    }
}
