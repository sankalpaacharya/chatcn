"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Copy01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

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
      {!hasCopied ? <HugeiconsIcon icon={Copy01Icon} size={18} /> : "Copied"}
    </Button>
  );
}
