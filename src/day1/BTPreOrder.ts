const walk = (node: BinaryNode<number> | null, list: number[]): void => {
  if (!node) {
    return;
  }
  list.push(node.value);
  walk(node.left, list);
  walk(node.right, list);
};

export default function pre_order_search(head: BinaryNode<number>): number[] {
  const list: number[] = [];
  walk(head, list);
  return list;
}
