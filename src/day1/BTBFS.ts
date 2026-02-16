export default function bfs(head: BinaryNode<number>, needle: number): boolean {
  const nodes: (BinaryNode<number> | null)[] = [head];

  while (nodes.length > 0) {
    const curr = nodes.shift();

    if (curr?.value === needle) {
      return true;
    }
    if (curr?.left) {
      nodes.push(curr.left);
    }
    if (curr?.right) {
      nodes.push(curr.right);
    }
  }
  return false;
}
