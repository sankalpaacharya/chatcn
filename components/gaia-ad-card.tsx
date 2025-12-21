import Image from "next/image";
import Link from "next/link";

export default function GaiaAdCard() {
  return (
    <Link
      href="https://heygaia.io"
      target="_blank"
      rel="noopener noreferrer"
      className="group mt-6 block overflow-hidden rounded-xl border border-border/50 w-xs bg-linear-to-br from-[#02bdff]/5 via-background to-[#059cda]/5 p-5 transition-all duration-300 hover:border-[#02bdff]/50 hover:shadow-lg hover:shadow-[#02bdff]/10"
    >
      <div className="flex items-center gap-4">
        <div className="relative h-12 w-12 shrink-0 rounded-xl bg-linear-to-br from-[#02bdff]/20 to-[#0f537c]/20 p-1.5">
          <Image
            src="/images/gaia_logo.svg"
            alt="Gaia Logo"
            fill
            className="object-contain p-1"
          />
        </div>
        <div className="min-w-0">
          <h4 className="text-base font-semibold text-foreground group-hover:text-[#02bdff] transition-colors">
            Gaia
          </h4>
          <p className="text-sm text-muted-foreground">
            Your AI productivity copilot
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground/80 leading-relaxed">
        Plan, execute, and achieve your goals with AI-powered workflows.
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#02bdff] group-hover:gap-2.5 transition-all">
        Learn more
        <svg
          className="h-4 w-4"
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
