import { cn } from "@/lib/utils";
import { SourceCodeIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type FileProps = {
  className?: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
} & React.HTMLProps<HTMLDivElement>;

export function File({
  className,
  title,
  description,
  icon,
  ...props
}: FileProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-3 hover:bg-muted/80 transition border cursor-pointer",
        className
      )}
      {...props}
    >
      {icon ?? (
        <HugeiconsIcon
          icon={SourceCodeIcon}
          className="w-8 h-8 text-muted-foreground"
        />
      )}
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-medium text-foreground">{title}</span>
        <span className="text-xs text-muted-foreground">{description}</span>
      </div>
    </div>
  );
}
