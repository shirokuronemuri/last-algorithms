const walk = (node: BinaryNode<number> | null, list: number[]): void => {
  if (!node) {
    return;
  }
  walk(node.left, list);
  list.push(node.value);
  walk(node.right, list);
};

export default function in_order_search(head: BinaryNode<number>): number[] {
  const list: number[] = [];
  walk(head, list);
  return list;
}
