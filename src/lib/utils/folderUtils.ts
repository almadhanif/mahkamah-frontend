type Folder = {
  id: number;
  name: string;
  parent_id: number | null;
  children?: Folder[];
};

export function findFolderById(
  nodes: Folder[],
  id: number | null,
): Folder | null {
  if (id === null) return null;

  for (const node of nodes) {
    if (node.id === id) {
      return node;
    }
    if (node.children) {
      const found = findFolderById(node.children, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
}
