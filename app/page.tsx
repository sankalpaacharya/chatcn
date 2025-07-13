import Heatmap from "@/components/heat-map";
import { ShootingStars } from "@/components/shooting-stars";
import { StarsBackground } from "@/components/shotting-stars-background";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full max-w-5xl h-screen mx-auto flex items-center flex-col justify-center space-y-5">
      <ShootingStars className="-z-10" />
      <StarsBackground className="-z-10" />

      <h1 className="relative z-10 text-5xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
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
      <div className="w-full px-3 flex justify-center">
        <Heatmap
          title="Spending Per day"
          description="Track your daily spending "
        />
      </div>
    </div>
  );
}
