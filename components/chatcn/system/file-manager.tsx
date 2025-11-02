import React from "react";
import {
  Folder as FolderIcon,
  File as FileIcon,
  Image as ImageIcon,
  Play,
  FileText,
  FileCode,
} from "lucide-react";

type ItemCommonProps = {
  name: string;
  onClick?: () => void;
  className?: string;
  thumbnail?: string;
  src?: string;
  tabIndex?: number;
};

export function FolderItem({
  name,
  onClick,
  className = "",
  tabIndex = 0,
}: ItemCommonProps) {
  return (
    <div
      onDoubleClick={onClick}
      className={`flex flex-col h-44 w-40 hover:bg-muted items-center justify-center p-3 rounded-lg bg-transparent cursor-pointer ${className}`}
      tabIndex={tabIndex}
    >
      <div className="w-28 h-28 flex items-center justify-center rounded-md">
        <FolderIcon className="w-20 h-20 text-primary" />
      </div>
      <span className="text-sm text-muted-foreground truncate mt-2">
        {name}
      </span>
    </div>
  );
}

export function FileItem({
  name,
  onClick,
  className = "",
  tabIndex = 0,
  thumbnail,
}: ItemCommonProps) {
  const fileExtension = (name.split(".").pop() || "").toLowerCase();
  const meta = getFileMeta(fileExtension);
  const imageSrc = thumbnail;

  return (
    <div
      onDoubleClick={onClick}
      className={`flex flex-col h-44 w-40 hover:bg-muted items-center justify-center p-3 rounded-lg bg-transparent cursor-pointer ${className}`}
      tabIndex={tabIndex}
    >
      <div className="w-28 h-28 flex items-center justify-center rounded-md relative overflow-hidden">
        {imageSrc ? (
          <>
            <img
              src={imageSrc}
              alt={name}
              loading="lazy"
              className="object-cover w-full h-full rounded-md"
            />
            {meta.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-md">
                <div className="bg-black/50 rounded-full p-2">
                  <Play className="w-5 h-5 text-white fill-white" />
                </div>
              </div>
            )}
          </>
        ) : (
          <meta.icon className="w-20 h-20 text-muted-foreground" />
        )}
      </div>
      <span className="text-sm text-muted-foreground truncate mt-2">
        {name}
      </span>
    </div>
  );
}

function getFileMeta(extension: string) {
  const imageExt = ["png", "jpg", "jpeg", "gif", "svg", "webp"];
  const videoExt = ["mp4", "mov", "avi", "mkv", "webm"];
  const textExt = ["txt", "md", "markdown"];
  const codeExt = [
    "js",
    "ts",
    "jsx",
    "tsx",
    "py",
    "java",
    "c",
    "cpp",
    "cs",
    "json",
    "html",
    "css",
  ];
  if (imageExt.includes(extension)) return { type: "image", icon: ImageIcon };
  if (videoExt.includes(extension)) return { type: "video", icon: Play };
  if (textExt.includes(extension)) return { type: "text", icon: FileText };
  if (codeExt.includes(extension)) return { type: "code", icon: FileCode };
  return { type: "unknown", icon: FileIcon };
}
