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
    errors?: any[];
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
            const errorDetails = await res.text();
            console.error(`Failed to fetch from LeetCode GraphQL: Status ${res.status} - ${res.statusText}. Details: ${errorDetails}`);
            return NextResponse.json(
                { error: "Failed to fetch from LeetCode", details: `Status: ${res.status}, Message: ${res.statusText}` },
                { status: res.status }
            );
        }

        const data: LeetcodeGraphQLResponse = await res.json();

        if (data.errors && data.errors.length > 0) {
            console.error("LeetCode GraphQL errors:", data.errors);
            return NextResponse.json(
                { error: "LeetCode GraphQL query failed", details: data.errors },
                { status: 500 }
            );
        }

        if (
            !data.data?.matchedUser?.userCalendar ||
            typeof data.data.matchedUser.userCalendar.submissionCalendar !== 'string'
        ) {
            console.error("LeetCode GraphQL response structure unexpected or submissionCalendar missing/not a string.", data);
            return NextResponse.json(
                {
                    error: "Unexpected LeetCode GraphQL response structure or missing data",
                    details: data,
                },
                { status: 500 }
            );
        }

        const raw: LeetcodeRawSubmissionCalendar = JSON.parse(data.data.matchedUser.userCalendar.submissionCalendar);

        const daily: DailyCount[] = Object.entries(raw).map(([timestamp, count]) => ({
            date: new Date(Number(timestamp) * 1000).toISOString().split("T")[0],
            count: Number(count),
        }));

        const weeklyMap: Record<string, number> = {};
        daily.forEach(({ date, count }) => {
            const week = startOfWeek(parseISO(date)).toISOString().split("T")[0];
            weeklyMap[week] = (weeklyMap[week] || 0) + count;
        });

        const weekly: WeeklyCount[] = Object.entries(weeklyMap)
            .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
            .map(([week, count]) => ({ week, count }));

        return NextResponse.json<LeetcodeHeatmapApiResponse>({
            daily,
            weekly,
        });
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        console.error("LeetCode API error:", errorMessage);
        return NextResponse.json(
            { error: "Unexpected server error", details: errorMessage },
            { status: 500 }
        );
    }
}