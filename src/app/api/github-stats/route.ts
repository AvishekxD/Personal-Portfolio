import { NextResponse } from "next/server";
import { format, subDays, isAfter, parseISO } from "date-fns";

interface GithubCommit {
  sha: string;
  author: { email: string; name: string };
  message: string;
}

interface PushEventPayload {
  commits?: GithubCommit[];
}

interface GithubEvent {
  id: string;
  type: string;
  actor: { login: string; display_login: string };
  repo: { name: string };
  created_at: string;
  payload: PushEventPayload;
}

interface WeeklyCommitEntry {
  date: string;
  count: number;
}

interface GithubStatsResponse {
  totalCommits: number;
  weeklyCommits: WeeklyCommitEntry[];
  dailyCommits: Record<string, number>;
}

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
      console.error(`GitHub API error: ${res.status} ${res.statusText}`);
      return NextResponse.json({ error: "GitHub API error" }, { status: res.status });
    }

    const events: GithubEvent[] = await res.json();
    const commits = events.filter((e): e is GithubEvent => e.type === "PushEvent");

    const now = new Date();
    const twoWeeksAgo = subDays(now, 13);
    const dailyMap: Record<string, number> = {};

    for (let i = 0; i < 14; i++) {
      const date = subDays(now, 13 - i);
      const key = format(date, "yyyy-MM-dd");
      dailyMap[key] = 0;
    }

    const todayKey = format(now, "yyyy-MM-dd");
    if (!(todayKey in dailyMap)) {
      dailyMap[todayKey] = 0;
    }

    for (const event of commits) {
      const commitDate = parseISO(event.created_at);
      const dateKey = format(commitDate, "yyyy-MM-dd");

      if (isAfter(commitDate, subDays(now, 14)) || dateKey === format(twoWeeksAgo, "yyyy-MM-dd")) {
        if (dailyMap[dateKey] !== undefined) {
          const commitCount = event.payload.commits?.length || 0;
          dailyMap[dateKey] += commitCount;
        }
      }
    }

    const weeklyCommits: WeeklyCommitEntry[] = Object.entries(dailyMap)
      .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
      .map(([date, count]) => ({ date, count }));

    const totalCommits = commits.reduce((sum, e) => sum + (e.payload.commits?.length || 0), 0);

    return NextResponse.json<GithubStatsResponse>({
      totalCommits,
      weeklyCommits,
      dailyCommits: dailyMap,
    });
  } catch (err: unknown) {
    console.error("GitHub stats fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch GitHub stats" }, { status: 500 });
  }
}
