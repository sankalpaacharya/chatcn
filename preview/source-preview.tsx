import React from "react";
import {
  Source,
  SourceContent,
  SourceTrigger,
} from "@/registry/new-york/source";

export default function SourcePreview() {
  return (
    <div className="flex justify-center py-10">
      <div className="space-x-5">
        <Source href="https://google.com">
          <SourceTrigger></SourceTrigger>
          <SourceContent
            title="Google"
            description="Google is a multinational technology company known primarily for its search engine and online advertising technologies"
          />
        </Source>
        <Source href="https://openai.com">
          <SourceTrigger></SourceTrigger>
          <SourceContent
            title="OpenAI"
            description="OpenAI, Inc. is an American artificial intelligence organization founded in December 2015 and headquartered in San Francisco, California."
          />
        </Source>
        <Source href="https://sankalpa.info.np">
          <SourceTrigger></SourceTrigger>
          <SourceContent
            title="My Developer Workflow ⚙️ "
            description="Since i3 is just a window manager and not a desktop environment, it doesn’t come with a lot of things by default. You don’t get a beautiful status bar where you can increase and decrease the volume and brightness, no quick UI to connect to wifi, or application launcher showing application icons."
          />
        </Source>
      </div>
    </div>
  );
}
