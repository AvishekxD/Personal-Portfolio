import { NextResponse } from 'next/server';

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

export async function GET() {
    const token = process.env.GITHUB_GRAPHQL_TOKEN;

    if (!token) {
        return NextResponse.json({ error: 'GitHub token not found' }, { status: 500 });
    }

    const query = `
    query {
      viewer {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

    try {
        const res = await fetch(GITHUB_GRAPHQL_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        const json = await res.json();
        const weeks = json.data.viewer.contributionsCollection.contributionCalendar.weeks;

        const days = weeks.flatMap((week: any) => week.contributionDays);

        const mapped = days.map((d: any) => ({
            date: d.date,
            count: d.contributionCount,
        }));

        return NextResponse.json(mapped);
    } catch (err) {
        console.error('[GitHub Heatmap Error]', err);
        return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: 500 });
    }
}
