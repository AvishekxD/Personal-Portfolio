import { NextResponse } from "next/server";

type SubmissionStat = {
  difficulty: "All" | "Easy" | "Medium" | "Hard";
  count: number;
};

interface LeetCodeAPIResponse {
  data: {
    matchedUser: {
      submitStatsGlobal: {
        acSubmissionNum: SubmissionStat[];
      };
    } | null;
  };
}

export async function GET() {
  const username = "AvishekzZ";

  const query = {
    operationName: "getUserProfile",
    query: `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
      }
    `,
    variables: { username },
  };

  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: `https://leetcode.com/${username}/`,
      },
      body: JSON.stringify(query),
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "LeetCode API error" }, { status: res.status });
    }

    const json: LeetCodeAPIResponse = await res.json();

    const submissions = json.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum ?? [];

    const findCount = (difficulty: SubmissionStat["difficulty"]): number =>
      submissions.find((s) => s.difficulty === difficulty)?.count ?? 0;

    return NextResponse.json({
      totalSolved: findCount("All"),
      easySolved: findCount("Easy"),
      mediumSolved: findCount("Medium"),
      hardSolved: findCount("Hard"),
    });
  } catch {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
