import React from "react";
import { Folder as FolderIcon, File as FileIcon } from "lucide-react";

type ItemCommonProps = {
  name: string;
  onClick?: () => void;
  className?: string;
  role?: React.AriaRole | undefined;
  tabIndex?: number;
};

export function FolderItem({
  name,
  onClick,
  className = "",
  role = "button",
  tabIndex = 0,
}: ItemCommonProps) {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col hover:bg-muted items-center p-4 border border-border rounded-lg bg-transparent cursor-pointer ${className}`}
      role={role}
      tabIndex={tabIndex}
    >
      <FolderIcon className="w-10 h-10 text-primary mb-2" />
      <span className="text-sm text-muted-foreground truncate">{name}</span>
    </div>
  );
}

export function FileItem({
  name,
  onClick,
  className = "",
  role = "img",
  tabIndex = 0,
}: ItemCommonProps) {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col hover:bg-muted items-center p-4 border border-border rounded-lg bg-transparent cursor-pointer ${className}`}
      role={role}
      tabIndex={tabIndex}
    >
      <FileIcon className="w-10 h-10 text-muted-foreground mb-2" />
      <span className="text-sm text-muted-foreground truncate">{name}</span>
    </div>
  );
}
