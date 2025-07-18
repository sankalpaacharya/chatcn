import { ShootingStars } from "@/components/shooting-stars";
import { StarsBackground } from "@/components/shotting-stars-background";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Heatmap from "@/registry/new-york/calendar/calendar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col max-w-5xl mx-auto justify-center items-center min-h-full gap-4">
      <ShootingStars className="-z-10" />
      <StarsBackground className="-z-10" />
      <h1 className="text-4xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
        Collection of Shadcn Components
      </h1>
      <Link
        href={"https://github.com/sankalpaacharya"}
        className="flex gap-2 items-center"
      >
        Made by <span className="italic">Sanku</span>
        <Avatar>
          <AvatarImage src="https://github.com/sankalpaacharya.png" />
          <AvatarFallback>SA</AvatarFallback>
        </Avatar>
      </Link>
      <Link href={"/docs"}>
        <Button className="cursor-pointer font-medium">
          Explore Components
        </Button>
      </Link>
      <Heatmap
        title="Spending Per day"
        description="Track your daily spending "
      />
    </div>
  );
}
