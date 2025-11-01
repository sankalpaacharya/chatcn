import { useFileManager, FileNode } from "@/hooks/useFileManager";
import { Folder, File } from "lucide-react";

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

export default function FileManager() {
  const { path, currentFolder, openFolder, goBack, goTo } =
    useFileManager(data);

  return (
    <div className="p-6 space-y-6 mx-auto">
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
        {currentFolder.map((item) => (
          <div
            key={item.name}
            onClick={() =>
              item.type === "folder" ? openFolder(item.name) : null
            }
            className="flex flex-col hover:bg-muted items-center p-4 border border-border rounded-lg bg-transparent cursor-pointer"
            role={item.type === "folder" ? "button" : "img"}
            tabIndex={0}
          >
            {item.type === "folder" ? (
              <Folder className="w-10 h-10 text-primary mb-2" />
            ) : (
              <File className="w-10 h-10 text-muted-foreground mb-2" />
            )}
            <span className="text-sm text-muted-foreground truncate">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
