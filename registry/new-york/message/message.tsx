import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type MessageProps = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLProps<HTMLDivElement>;

export function Message({ children, className, ...props }: MessageProps) {
  return (
    <div className={cn("flex gap-3 items-center", className)} {...props}>
      {children}
    </div>
  );
}

type MessageAvatarProps = {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
};
export function MessageAvatar({ src, alt, className }: MessageAvatarProps) {
  return (
    <Avatar className={cn("h-8 w-8", className)}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

type MessageContentProps = {
  className?: string;
  children: React.ReactNode;
} & React.HTMLProps<HTMLDivElement>;

export function MessageContent({ children, className }: MessageContentProps) {
  return (
    <div
      className={cn(
        "rounded-lg p-2 text-foreground bg-secondary break-words whitespace-normal",
        className
      )}
    >
      {children}
    </div>
  );
}
