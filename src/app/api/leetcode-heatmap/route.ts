import { NextResponse } from "next/server";
import { startOfWeek, parseISO } from "date-fns";

interface LeetcodeRawSubmissionCalendar {
    [timestamp: string]: number;
}

interface LeetcodeUserCalendar {
    submissionCalendar: string;
}

interface LeetcodeMatchedUser {
    userCalendar: LeetcodeUserCalendar;
}

interface LeetcodeGraphQLResponse {
    data?: {
        matchedUser?: LeetcodeMatchedUser;
    };
    errors?: { message: string }[];
}

interface DailyCount {
    date: string;
    count: number;
}

interface WeeklyCount {
    week: string;
    count: number;
}

interface LeetcodeHeatmapApiResponse {
    daily: DailyCount[];
    weekly: WeeklyCount[];
}

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
            const errorText = await res.text();
            console.error(`Failed to fetch: ${res.status} - ${res.statusText} - ${errorText}`);
            return NextResponse.json(
                {
                    error: "Failed to fetch from LeetCode",
                    details: errorText,
                },
                { status: res.status }
            );
        }

        const data: LeetcodeGraphQLResponse = await res.json();

        if (data.errors && data.errors.length > 0) {
            console.error("GraphQL errors:", data.errors);
            return NextResponse.json(
                { error: "LeetCode GraphQL returned errors", details: data.errors },
                { status: 500 }
            );
        }

        const calendarString = data.data?.matchedUser?.userCalendar?.submissionCalendar;

        if (!calendarString || typeof calendarString !== "string") {
            console.error("submissionCalendar missing or invalid", data);
            return NextResponse.json(
                { error: "submissionCalendar missing or invalid", details: data },
                { status: 500 }
            );
        }

        const raw: LeetcodeRawSubmissionCalendar = JSON.parse(calendarString);

        const daily: DailyCount[] = Object.entries(raw)
            .map(([timestamp, count]) => ({
                date: new Date(Number(timestamp) * 1000).toISOString().split("T")[0],
                count: Number(count),
            }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        const weeklyMap: Record<string, number> = {};
        for (const { date, count } of daily) {
            const week = startOfWeek(parseISO(date), { weekStartsOn: 1 }).toISOString().split("T")[0];
            weeklyMap[week] = (weeklyMap[week] || 0) + count;
        }

        const weekly: WeeklyCount[] = Object.entries(weeklyMap)
            .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
            .map(([week, count]) => ({ week, count }));

        return NextResponse.json<LeetcodeHeatmapApiResponse>({ daily, weekly });
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        console.error("Unexpected error:", errorMessage);
        return NextResponse.json(
            {
                error: "Unexpected server error",
                details: errorMessage,
            },
            { status: 500 }
        );
    }
}
