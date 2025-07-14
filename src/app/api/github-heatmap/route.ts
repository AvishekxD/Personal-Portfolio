import { NextResponse } from 'next/server';

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

interface ContributionDay {
    date: string;
    contributionCount: number;
}

interface ContributionWeek {
    contributionDays: ContributionDay[];
}

interface ContributionCalendar {
    totalContributions: number;
    weeks: ContributionWeek[];
}

interface ContributionsCollection {
    contributionCalendar: ContributionCalendar;
}

interface Viewer {
    contributionsCollection: ContributionsCollection;
}

interface GithubGraphQLResponse {
    data: {
        viewer: Viewer;
    };
}

interface HeatmapData {
    date: string;
    count: number;
}

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
            next: { revalidate: 1800 },
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error(`[GitHub GraphQL API Error] Status: ${res.status}, Response: ${errorText}`);
            return NextResponse.json({ error: 'Failed to fetch GitHub data from GraphQL API' }, { status: res.status });
        }

        const json: GithubGraphQLResponse = await res.json();
        const weeks = json.data?.viewer?.contributionsCollection?.contributionCalendar?.weeks;

        if (!weeks) {
            console.error('[GitHub Heatmap Error] Weeks data not found in GraphQL response.');
            return NextResponse.json({ error: 'Failed to process GitHub contribution data' }, { status: 500 });
        }

        const days: ContributionDay[] = weeks.flatMap(
            (week: ContributionWeek) => week.contributionDays
        );

        const mapped: HeatmapData[] = days.map((d: ContributionDay) => ({
            date: d.date,
            count: d.contributionCount,
        }));

        return NextResponse.json(mapped);
    } catch (err: unknown) {
        console.error('[GitHub Heatmap Error]', err);
        return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: 500 });
    }
}