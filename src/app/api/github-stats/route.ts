import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const username = 'AvishekxD';

        const res = await fetch(`https://api.github.com/users/${username}/events`, {
            headers: {
                'User-Agent': 'request',
                Accept: 'application/vnd.github.v3+json',
            },
            next: { revalidate: 60 }
        });

        const events = await res.json();

        const commits = events.filter((e: any) => e.type === 'PushEvent');

        const thisWeek = new Date();
        const stats = Array(7).fill(0);

        for (const event of commits) {
            const date = new Date(event.created_at);
            const day = date.getDay();
            stats[day]++;
        }

        return NextResponse.json({
            totalCommits: commits.length,
            weeklyCommits: stats,
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch GitHub stats' }, { status: 500 });
    }
}
