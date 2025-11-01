import { useState } from "react";

export type FileNode = {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
};

export function useFileManager(initialData: FileNode[]) {
  const [path, setPath] = useState<string[]>(["home"]);

  const getCurrentFolder = (nodes: FileNode[], p: string[]): FileNode[] => {
    let current = nodes;
    for (const folder of p) {
      const node = current.find(
        (n) => n.name === folder && n.type === "folder"
      );
      if (node?.children) current = node.children;
    }
    return current;
  };

  const currentFolder = getCurrentFolder(initialData, path);

  const openFolder = (folderName: string) => {
    setPath((prev) => [...prev, folderName]);
  };

  const goBack = () => {
    if (path.length > 1) setPath((prev) => prev.slice(0, -1));
  };

  const goTo = (index: number) => {
    setPath((prev) => prev.slice(0, index + 1));
  };

  return { path, currentFolder, openFolder, goBack, goTo };
}
