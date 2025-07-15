import { NextResponse } from "next/server";
import { startOfWeek, parseISO } from "date-fns";

interface LeetcodeRawSubmissionCalendar {
  [timestamp: string]: number;
}

interface LeetcodeGraphQLResponse {
  data?: {
    matchedUser?: {
      userCalendar?: {
        submissionCalendar?: string;
      };
    };
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
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        { error: "Failed to fetch from LeetCode", details: errorText },
        { status: res.status }
      );
    }

    const json: LeetcodeGraphQLResponse = await res.json();
    const calendarString = json.data?.matchedUser?.userCalendar?.submissionCalendar;

    if (!calendarString || typeof calendarString !== "string") {
      return NextResponse.json(
        { error: "submissionCalendar missing or invalid", details: json },
        { status: 500 }
      );
    }

    const raw: LeetcodeRawSubmissionCalendar = JSON.parse(calendarString);

    const daily: DailyCount[] = Object.entries(raw)
      .map(([timestamp, count]) => {
        const istOffsetSeconds = 5.5 * 3600;
        const date = new Date((Number(timestamp) + istOffsetSeconds) * 1000)
          .toISOString()
          .split("T")[0];

        return { date, count: Number(count) };
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const weeklyMap: Record<string, number> = {};

    for (const { date, count } of daily) {
      const weekStart = startOfWeek(parseISO(date), { weekStartsOn: 1 })
        .toISOString()
        .split("T")[0];

      weeklyMap[weekStart] = (weeklyMap[weekStart] || 0) + count;
    }

    const weekly: WeeklyCount[] = Object.entries(weeklyMap)
      .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
      .map(([week, count]) => ({ week, count }));

    return NextResponse.json<LeetcodeHeatmapApiResponse>({ daily, weekly });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error during fetch";
    return NextResponse.json(
      { error: "Unexpected server error", details: errorMessage },
      { status: 500 }
    );
  }
}
