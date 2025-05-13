let idCounter = 100; // for unique IDs

export const addNode = (tree, folderId, newNode) => {
  return tree.map((node) => {
    if (node.id === folderId && node.isFolder) {
      return {
        ...node,
        children: [...(node.children || []), newNode]
      };
    } else if (node.children) {
      return { ...node, children: addNode(node.children, folderId, newNode) };
    }
    return node;
  });
};

export const deleteNode = (tree, nodeId) => {
  return tree
    .filter((node) => node.id !== nodeId)
    .map((node) => {
      if (node.children) {
        return { ...node, children: deleteNode(node.children, nodeId) };
      }
      return node;
    });
};
