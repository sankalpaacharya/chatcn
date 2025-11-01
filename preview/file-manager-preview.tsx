import { useFileManager, FileNode } from "@/hooks/useFileManager";
import { FolderItem, FileItem } from "@/components/chatcn/system/file-manager";

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
        {currentFolder.map((item) =>
          item.type === "folder" ? (
            <FolderItem
              key={item.name}
              name={item.name}
              onClick={() => openFolder(item.name)}
              role="button"
              tabIndex={0}
            />
          ) : (
            <FileItem
              key={item.name}
              name={item.name}
              onClick={() => null}
              role="img"
              tabIndex={0}
            />
          )
        )}
      </div>
    </div>
  );
}
