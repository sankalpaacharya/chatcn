import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Message() {
  return <div></div>;
}

export function MessageAvatar() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

export function MessageContent() {}
