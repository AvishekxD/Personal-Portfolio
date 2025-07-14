import { NextResponse } from 'next/server';

interface LeetCodeApiData {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  contributionPoints?: number;
  message?: string;
  status?: string;
}

interface LeetCodeStatsResponse {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  contributionPoints?: number;
}

export async function GET() {
  const username = 'AvishekzZ';

  try {
    const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`, {
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Failed to fetch LeetCode stats from external API: Status ${res.status}, Response: ${errorText}`);
      return NextResponse.json({ error: 'Failed to fetch LeetCode stats', details: errorText }, { status: res.status });
    }

    const data: LeetCodeApiData = await res.json();

    if (typeof data.totalSolved !== 'number' || typeof data.ranking !== 'number') {
      console.error('Received malformed data from LeetCode stats API:', data);
      return NextResponse.json({ error: 'Malformed data received from LeetCode stats API' }, { status: 500 });
    }

    return NextResponse.json<LeetCodeStatsResponse>({
      totalSolved: data.totalSolved,
      easySolved: data.easySolved,
      mediumSolved: data.mediumSolved,
      hardSolved: data.hardSolved,
      ranking: data.ranking,
      contributionPoints: data.contributionPoints,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error('Unexpected error fetching LeetCode stats:', errorMessage);
    return NextResponse.json({ error: 'Unexpected error fetching LeetCode stats', details: errorMessage }, { status: 500 });
  }
}