"use client";
import GitHubProfile from "@/components/social/github-profile";

export default function Page() {
  return (
    <div className="">
      <GitHubProfile
        avatarUrl="https://avatars.githubusercontent.com/u/12345678"
        displayName="renders"
        pronouns="e/λ"
        username="renderhq"
        bio="reinforcement learning . @thelaughingcorp head of frontend ."
        followers={88}
        following={31}
        organization="@thelaughingcorp"
        location="network waterfall"
        twitter="infinterenders"
        website="https://justfuckingusenext.vercel.app"
      />
    </div>
  );
}
