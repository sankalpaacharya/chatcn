import Image from "next/image";
import Link from "next/link";

export default function GaiaAdCard() {
  return (
    <Link
      href="https://heygaia.io"
      target="_blank"
      rel="noopener noreferrer"
      className="group mt-6 block overflow-hidden rounded-lg border border-border/50 w-full bg-linear-to-br from-[#02bdff]/5 via-background to-[#059cda]/5 p-3 transition-all duration-300 hover:border-[#02bdff]/50"
    >
      <div className="flex items-center gap-2.5">
        <div className="relative h-8 w-8 shrink-0 rounded-lg bg-linear-to-br from-[#02bdff]/20 to-[#0f537c]/20">
          <Image
            src="/images/gaia_logo.svg"
            alt="Gaia Logo"
            fill
            className="object-contain p-1"
          />
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-foreground group-hover:text-[#02bdff] transition-colors">
            Gaia
          </h4>
          <p className="text-xs text-muted-foreground">
            Your AI productivity copilot
          </p>
        </div>
      </div>
      <p className="mt-2.5 text-xs text-muted-foreground/80 leading-relaxed">
        Plan, execute, and achieve your goals with AI-powered workflows.
      </p>
      <span className="mt-2.5 inline-flex items-center gap-1 text-xs font-medium text-[#02bdff] group-hover:gap-2 transition-all">
        Learn more
        <svg
          className="h-3 w-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </span>
    </Link>
  );
}
