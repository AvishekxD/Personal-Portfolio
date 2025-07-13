import { NextResponse } from "next/server";
import { format, subDays, isAfter } from "date-fns";

export async function GET() {
  try {
    const username = "AvishekxD";
    const token = process.env.GITHUB_TOKEN;

    const res = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...(token && { Authorization: `token ${token}` }),
      },
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "GitHub API error" }, { status: 500 });
    }

    const events = await res.json();
    const commits = events.filter((e: any) => e.type === "PushEvent");

    const now = new Date();
    const twoWeeksAgo = subDays(now, 13);
    const dailyMap: Record<string, number> = {};

    for (let i = 0; i < 14; i++) {
      const date = subDays(now, 13 - i);
      const key = format(date, "yyyy-MM-dd");
      dailyMap[key] = 0;
    }

    for (const event of commits) {
      const commitDate = new Date(event.created_at);
      if (!isAfter(commitDate, twoWeeksAgo)) continue;

      const key = format(commitDate, "yyyy-MM-dd");
      if (dailyMap[key] !== undefined) {
        dailyMap[key] += event.payload.commits?.length || 0;
      }
    }

    const weeklyCommits = Object.entries(dailyMap)
      .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
      .map(([date, count]) => ({ date, count }));

    const totalCommits = commits.reduce(
      (sum: number, e: any) => sum + (e.payload.commits?.length || 0),
      0
    );

    return NextResponse.json({
      totalCommits,
      weeklyCommits,
      dailyCommits: dailyMap,
    });
  } catch (err) {
    console.error("GitHub stats fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch GitHub stats" }, { status: 500 });
  }
}
