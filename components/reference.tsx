import { Badge } from "./ui/badge";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Props = { href: string; label: string };

export default function Reference({ href, label }: Props) {
  return (
    <Link key={href} href={label}>
      <Badge
        variant="secondary"
        className="font-semibold hover:bg-secondary/80 transition-colors p-1.5 ml-1"
      >
        {label}
        <ArrowUpRight />
      </Badge>
    </Link>
  );
}
