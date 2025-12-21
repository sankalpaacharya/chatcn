"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/* ================= Icons ================= */

const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LocationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
  </svg>
);

const LinkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
  </svg>
);

const BuildingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
  </svg>
);

const UsersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
);

/* ================= Types ================= */

export interface GitHubProfileProps {
  avatarUrl: string;
  displayName: string;
  pronouns?: string;
  username: string;
  bio?: string;
  followers?: number;
  following?: number;
  organization?: string;
  location?: string;
  twitter?: string;
  website?: string;
  className?: string;
}

/* ================= Component ================= */

export default function GitHubProfile({
  avatarUrl,
  displayName,
  pronouns,
  username,
  bio,
  followers = 0,
  following = 0,
  organization,
  location,
  twitter,
  website,
  className,
}: GitHubProfileProps) {
  return (
    <div
      className={cn(
        "w-full max-w-[340px] rounded-xl bg-[#0d1117] p-5",
        "border border-[#30363d]",
        className
      )}
    >
      {/* Avatar */}
      <div className="mb-4 flex justify-center">
        <Avatar className="size-32 border-[3px] border-[#30363d]">
          <AvatarImage
            src={avatarUrl}
            alt={displayName}
            className="object-cover"
          />
          <AvatarFallback className="bg-[#21262d] text-2xl font-medium text-[#e6edf3]">
            {displayName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Name and username */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold leading-tight text-[#e6edf3]">
          {displayName}
          {pronouns && (
            <span className="ml-1.5 text-base font-normal text-[#848d97]">
              ({pronouns})
            </span>
          )}
        </h2>
        <p className="text-base font-light text-[#848d97]">{username}</p>
      </div>

      {/* Bio */}
      {bio && (
        <p className="mb-4 text-sm leading-relaxed text-[#e6edf3]">
          {bio.split("@").map((part, i) =>
            i === 0 ? (
              part
            ) : (
              <React.Fragment key={i}>
                <span className="text-[#f78166]">@{part.split(" ")[0]}</span>
                {part.substring(part.indexOf(" "))}
              </React.Fragment>
            )
          )}
        </p>
      )}

      {/* Followers / Following */}
      <div className="mb-4 flex items-center gap-1 text-sm text-[#848d97]">
        <UsersIcon className="mr-1 size-4" />
        <span className="font-semibold text-[#e6edf3]">{followers}</span>
        <span>followers</span>
        <span className="mx-1">·</span>
        <span className="font-semibold text-[#e6edf3]">{following}</span>
        <span>following</span>
      </div>

      {/* Info list */}
      <div className="space-y-1.5">
        {organization && (
          <div className="flex items-center gap-2 text-sm">
            <BuildingIcon className="size-4 shrink-0 text-[#848d97]" />
            <span className="text-[#f78166]">{organization}</span>
          </div>
        )}

        {location && (
          <div className="flex items-center gap-2 text-sm">
            <LocationIcon className="size-4 shrink-0 text-[#848d97]" />
            <span className="text-[#e6edf3]">{location}</span>
          </div>
        )}

        {twitter && (
          <div className="flex items-center gap-2 text-sm">
            <XIcon className="size-4 shrink-0 text-[#848d97]" />
            <a
              href={`https://x.com/${twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#e6edf3] hover:text-[#58a6ff] hover:underline"
            >
              @{twitter}
            </a>
          </div>
        )}

        {website && (
          <div className="flex items-center gap-2 text-sm">
            <LinkIcon className="size-4 shrink-0 text-[#848d97]" />
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#58a6ff] hover:underline"
            >
              {website.replace(/^https?:\/\//, "")}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
