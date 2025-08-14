"use client";
import { File } from "@/registry/new-york/file/file";
import { FileJson } from "lucide-react";

export default function FilePreview() {
  return (
    <File
      title="web_using_python_scrapper.js"
      description="javascript"
      icon={<FileJson className="w-8 h-8 text-muted-foreground" />}
    />
  );
}
