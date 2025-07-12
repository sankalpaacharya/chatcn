"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Clipboard } from "lucide-react";

export default function CopyClipBoard({ text }: { text: string }) {
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipBoard = async () => {
    try {
      navigator.clipboard.writeText(text);
    } catch (err) {
      console.log(err);
    }
    setHasCopied(true);
  };

  return (
    <Button onClick={copyToClipBoard} variant={"secondary"}>
      {!hasCopied ? <Clipboard size={18} /> : "Copied"}
    </Button>
  );
}
