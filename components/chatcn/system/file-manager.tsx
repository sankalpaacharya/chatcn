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
  src?: string;
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
      onDoubleClick={onClick}
      className={`flex flex-col hover:bg-muted items-center p-4 rounded-lg bg-transparent cursor-pointer ${className}`}
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
  src,
  className = "",
  role = "img",
  tabIndex = 0,
}: ItemCommonProps) {
  const fileExtension = (name.split(".").pop() || "").toLowerCase();

  const imageExt = ["png", "jpg", "jpeg", "gif", "svg", "webp"];
  const isImage = imageExt.includes(fileExtension) && !!src;
  const [imgError, setImgError] = React.useState(false);

  const Icon = getFileIcon(fileExtension);

  return (
    <div
      onDoubleClick={onClick}
      className={`flex flex-col hover:bg-muted items-center p-4 rounded-lg bg-transparent cursor-pointer ${className}`}
      role={role}
      tabIndex={tabIndex}
    >
      {isImage && !imgError ? (
        <img
          src={src}
          alt={name}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-20 h-20 object-cover rounded-md mb-2"
        />
      ) : (
        <Icon className="w-10 h-10 text-muted-foreground mb-2" />
      )}

      <span className="text-sm text-muted-foreground truncate">{name}</span>
    </div>
  );
}

function getFileIcon(extension: string): React.ComponentType<any> {
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

  if (imageExt.includes(extension)) return ImageIcon;
  if (videoExt.includes(extension)) return Play;
  if (textExt.includes(extension)) return FileText;
  if (codeExt.includes(extension)) return FileCode;

  return FileIcon;
}
