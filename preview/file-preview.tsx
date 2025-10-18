"use client";
import { File } from "@/components/chatcn/file";
import { FileJson } from "lucide-react";

export default function FilePreview() {
  return (
    <div className="flex justify-center">
      <File
        title="web_scrapper.js"
        description="javascript"
        icon={<FileJson className="w-8 h-8 text-muted-foreground" />}
      />
    </div>
  );
}
