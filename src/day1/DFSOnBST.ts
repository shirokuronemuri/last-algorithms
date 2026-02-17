const search = (curr: BinaryNode<number> | null, needle: number): boolean => {
  if (curr === null) {
    return false;
  }
  if (curr.value === needle) {
    return true;
  }
  if (needle > curr.value) {
    return search(curr.right, needle);
  }
  return search(curr.left, needle);
};

export default function dfs(head: BinaryNode<number>, needle: number): boolean {
  return search(head, needle);
}
