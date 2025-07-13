import { NextResponse } from 'next/server';

export async function GET() {
  const username = 'AvishekzZ'; 

  try {
    const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch LeetCode stats' }, { status: 500 });
    }

    const data = await res.json();

    return NextResponse.json({
      totalSolved: data.totalSolved,
      easySolved: data.easySolved,
      mediumSolved: data.mediumSolved,
      hardSolved: data.hardSolved,
      ranking: data.ranking,
      contributionPoints: data.contributionPoints,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Unexpected error fetching LeetCode stats' }, { status: 500 });
  }
}
