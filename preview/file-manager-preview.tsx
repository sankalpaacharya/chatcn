import { useFileManager, FileNode } from "@/hooks/useFileManager";
import { FolderItem, FileItem } from "@/components/chatcn/system/file-manager";

const data: FileNode[] = [
  {
    type: "folder",
    name: "projects",
    children: [
      {
        type: "folder",
        name: "chatcn",
        children: [
          { type: "file", name: "video.mp4" },
          { type: "file", name: "notes.txt" },
        ],
      },
      {
        type: "folder",
        name: "bloomi",
        children: [
          {
            type: "file",
            name: "video.mp4",
            thumbnail: "https://www.sankalpa.info.np/images/still.png",
          },
          {
            type: "file",
            name: "preview.png",
            thumbnail: "https://www.sankalpa.info.np/images/still.png",
          },
        ],
      },
      {
        type: "folder",
        name: "weride",
        children: [
          {
            type: "file",
            name: "preview.png",
            thumbnail: "https://www.sankalpa.info.np/images/weride.png",
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
              tabIndex={0}
            />
          ) : (
            <FileItem
              key={item.name}
              name={item.name}
              src={item.src}
              onClick={() => null}
              thumbnail={item.thumbnail}
              tabIndex={0}
            />
          )
        )}
      </div>
    </div>
  );
}
