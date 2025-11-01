import React from "react";
import { useFileManager, FileNode } from "@/hooks/useFileManager";
import { Folder as FolderIcon, File as FileIcon } from "lucide-react";

type ItemCommonProps = {
  name: string;
  onClick?: () => void;
  className?: string;
  role?: React.AriaRole | undefined;
  tabIndex?: number;
};

function FolderItem({
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

function FileItem({
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

const data: FileNode[] = [
  {
    type: "folder",
    name: "home",
    children: [
      {
        type: "folder",
        name: "sanku",
        children: [
          { type: "file", name: "resume.pdf" },
          { type: "file", name: "notes.txt" },
          {
            type: "folder",
            name: "projects",
            children: [{ type: "file", name: "fixyourspend.tsx" }],
          },
        ],
      },
    ],
  },
];

export function FileManager() {
  const { path, currentFolder, openFolder, goBack, goTo } =
    useFileManager(data);

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center text-sm text-muted-foreground">
        {path.map((folder, index) => (
          <div key={folder} className="flex items-center">
            <button
              onClick={() => goTo(index)}
              className="text-muted-foreground focus:outline-none hover:underline"
            >
              {folder}
            </button>
            {index < path.length - 1 && (
              <span className="mx-2 text-muted-foreground">/</span>
            )}
          </div>
        ))}
      </div>

      <div>
        <button
          onClick={goBack}
          disabled={path.length <= 1}
          className="px-3 py-1 border border-border rounded text-sm bg-muted/10 text-muted-foreground disabled:opacity-50"
        >
          ← Back
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {currentFolder.map((item) =>
          item.type === "folder" ? (
            <FolderItem
              key={item.name}
              name={item.name}
              onClick={() => openFolder(item.name)}
            />
          ) : (
            <FileItem key={item.name} name={item.name} />
          )
        )}
      </div>
    </div>
  );
}
