import React from "react";
import {
  Source,
  SourceContent,
  SourceTrigger,
} from "@/registry/new-york/source/source";

export default function Page() {
  return (
    <div className="flex justify-center py-10">
      <div className="w-xl">
        <Source href="https://google.com">
          <SourceTrigger label={"click this"}></SourceTrigger>
          <SourceContent
            title="google bencho"
            description="hello"
          ></SourceContent>
        </Source>
      </div>
    </div>
  );
}
