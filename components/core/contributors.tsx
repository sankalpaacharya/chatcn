"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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

export function ContributorsPage({
  repoOwner = "heygaia",
  repoName = "ui",
}: ContributorsPageProps) {
  const [contributors, setContributors] = useState<ContributorStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContributors() {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
        );
        const data = await response.json();

        // Handle rate limiting or non-array responses
        if (!Array.isArray(data)) {
          if (data.message?.includes("rate limit")) {
            setError("GitHub API rate limit exceeded. Please try again later.");
          } else if (data.message) {
            setError(data.message);
          } else {
            setError("Failed to fetch contributors. Please try again later.");
          }
          setLoading(false);
          return;
        }

        const contributorData = data as Contributor[];
        const detailedStats = await Promise.all(
          contributorData.slice(0, 20).map(async (contributor) => {
            try {
              const userResponse = await fetch(
                `https://api.github.com/users/${contributor.login}`,
              );
              const userData = await userResponse.json();

              const statsResponse = await fetch(
                `https://api.github.com/repos/${repoOwner}/${repoName}/stats/contributors`,
              );
              const statsData: GitHubStats[] = await statsResponse.json();
              const userStats = statsData?.find(
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
                name: userData.name,
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

        setContributors(detailedStats);
      } catch (error) {
        console.error("Error fetching contributors:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchContributors();
  }, [repoOwner, repoName]);

	return (
		<>
			{loading ? (
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
					<div className="text-muted-foreground mb-4">{error}</div>
					<div className="flex gap-3">
						<button
							type="button"
							onClick={() => window.location.reload()}
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
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {contributors.map((contributor) => (
            <Tooltip key={contributor.login}>
              <TooltipTrigger asChild>
                <a
                  href={contributor.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-accent transition-colors group aspect-square cursor-pointer"
                >
                  <Image
                    src={contributor.avatar_url}
                    alt={contributor.name || contributor.login}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full"
                  />
                  <div className="text-center">
                    <div className="text-sm font-medium group-hover:text-foreground transition-colors truncate text-nowrap">
                      {contributor.name || contributor.login}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {contributor.commits} commits
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