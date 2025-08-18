import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col h-full space-y-10">
      <div>
        <h1 className="text-4xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
          Design ChatApp UI with Chatcn
        </h1>
      </div>

      <Link href={"/docs"}>
        <Button className="cursor-pointer font-medium">
          Explore Components
        </Button>
      </Link>
    </div>
  );
}
