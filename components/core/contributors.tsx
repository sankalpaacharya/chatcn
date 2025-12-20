"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface Contributor {
	login: string;
	avatar_url: string;
	html_url: string;
	contributions: number;
}

interface GitHubStats {
	author?: { login: string };
	weeks?: Array<{ a: number; d: number }>;
	total: number;
}

interface ContributorStats {
	login: string;
	name: string | null;
	avatar_url: string;
	html_url: string;
	contributions: number;
	additions: number;
	deletions: number;
	commits: number;
}

interface ContributorsPageProps {
  repoOwner?: string;
  repoName?: string;
}

async function fetchContributorStats(
  repoOwner: string,
  repoName: string
): Promise<ContributorStats[]> {
  const response = await fetch(
    `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
  );
  const data = await response.json();

  if (!Array.isArray(data)) {
    if (data.message?.includes("rate limit")) {
      throw new Error("GitHub API rate limit exceeded. Please try again later.");
    } else if (data.message) {
      throw new Error(data.message);
    } else {
      throw new Error("Failed to fetch contributors. Please try again later.");
    }
  }

  const contributorData = data as Contributor[];
  
  // Fetch stats once for all contributors
  const statsResponse = await fetch(
    `https://api.github.com/repos/${repoOwner}/${repoName}/stats/contributors`,
  );
  const statsData: GitHubStats[] = await statsResponse.json();
  const statsArray = Array.isArray(statsData) ? statsData : [];

  const detailedStats = await Promise.all(
    contributorData.slice(0, 20).map(async (contributor) => {
      try {
        const userResponse = await fetch(
          `https://api.github.com/users/${contributor.login}`,
        );
        const userData = await userResponse.json();

        const userStats = statsArray.find(
          (s) => s.author?.login === contributor.login,
        );

        const totalAdditions =
          userStats?.weeks?.reduce((sum, week) => sum + week.a, 0) || 0;
        const totalDeletions =
          userStats?.weeks?.reduce((sum, week) => sum + week.d, 0) || 0;
        const totalCommits =
          userStats?.total || contributor.contributions;

        return {
          login: contributor.login,
          name: userData.name || null,
          avatar_url: contributor.avatar_url,
          html_url: contributor.html_url,
          contributions: contributor.contributions,
          additions: totalAdditions,
          deletions: totalDeletions,
          commits: totalCommits,
        };
      } catch {
        return {
          login: contributor.login,
          name: null,
          avatar_url: contributor.avatar_url,
          html_url: contributor.html_url,
          contributions: contributor.contributions,
          additions: 0,
          deletions: 0,
          commits: contributor.contributions,
        };
      }
    }),
  );

  return detailedStats;
}

export function ContributorsPage({
  repoOwner = "heygaia",
  repoName = "ui",
}: ContributorsPageProps) {
  const { data: contributors = [], isLoading, error, refetch } = useQuery({
    queryKey: ["contributors", repoOwner, repoName],
    queryFn: () => fetchContributorStats(repoOwner, repoName),
    staleTime: 1000 * 60 * 60, // 1 hour - data stays fresh
    gcTime: 1000 * 60 * 60 * 24, // 24 hours - keep in cache
    retry: 1,
  });

	return (
		<>
			{isLoading ? (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
					{Array.from({ length: 10 }).map((_, i) => (
						<div
							key={`skeleton-${i}`}
							className="flex flex-col items-center gap-3"
						>
							<Skeleton className="h-16 w-16 rounded-full" />
							<Skeleton className="h-4 w-24" />
						</div>
					))}
				</div>
			) : error ? (
				<div className="flex flex-col items-center justify-center py-12 text-center">
					<div className="text-muted-foreground mb-4">{error.message}</div>
					<div className="flex gap-3">
						<button
							type="button"
							onClick={() => refetch()}
							className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
						>
							Try Again
						</button>
						<a
							href={`https://github.com/${repoOwner}/${repoName}/graphs/contributors`}
							target="_blank"
							rel="noopener noreferrer"
							className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-sm font-medium"
						>
							View on GitHub
						</a>
					</div>
				</div>
			) : (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {contributors.map((contributor) => (
            <Tooltip key={contributor.login}>
              <TooltipTrigger asChild>
                <a
                  href={contributor.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07),0_1px_2px_-1px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_10px_-3px_rgba(0,0,0,0.3),0_1px_2px_-1px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_-5px_rgba(0,0,0,0.1),0_4px_10px_-5px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_-5px_rgba(0,0,0,0.4),0_4px_10px_-5px_rgba(0,0,0,0.3)] hover:border-border hover:bg-card/80 transition-all duration-300 ease-out group aspect-square cursor-pointer hover:-translate-y-1"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <Image
                      src={contributor.avatar_url}
                      alt={contributor.name || contributor.login}
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-full ring-2 ring-border/50 group-hover:ring-primary/30 transition-all duration-300 group-hover:scale-105"
                    />
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-card border-2 border-border flex items-center justify-center">
                      <span className="text-[10px] font-semibold text-muted-foreground">{contributor.commits}</span>
                    </div>
                  </div>
                  <div className="text-center relative z-10">
                    <div className="text-sm font-medium text-foreground/90 group-hover:text-foreground transition-colors truncate max-w-[120px]">
                      {contributor.name || contributor.login}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      @{contributor.login}
                    </div>
                  </div>
                </a>
              </TooltipTrigger>
              <TooltipContent className="p-4 bg-popover text-popover-foreground border shadow-xl">
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src={contributor.avatar_url}
                    alt={contributor.login}
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-sm">
                      {contributor.name || contributor.login}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      @{contributor.login}
                    </div>
                  </div>
                </div>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">Commits:</span>
                    <span className="font-medium">{contributor.commits}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">Additions:</span>
                    <span className="font-medium text-green-600">
                      +{contributor.additions.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">Deletions:</span>
                    <span className="font-medium text-red-600">
                      -{contributor.deletions.toLocaleString()}
                    </span>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
				</div>
			)}

			<div className="mt-12 p-6 rounded-lg bg-muted/50 border">
				<h2 className="text-lg font-semibold mb-2">Want to contribute?</h2>
				<p className="text-sm text-muted-foreground">
					Check out our{" "}
					<a
						href={`https://github.com/${repoOwner}/${repoName}/blob/main/CONTRIBUTING.md`}
						target="_blank"
						rel="noopener noreferrer"
						className="text-foreground hover:underline"
					>
						contributing guide
					</a>{" "}
					to get started. We welcome contributions of all kinds!
				</p>
			</div>
		</>
	);
}