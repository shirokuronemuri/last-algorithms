const walk = (node: BinaryNode<number> | null, list: number[]): void => {
  if (!node) {
    return;
  }
  walk(node.left, list);
  walk(node.right, list);
  list.push(node.value);
};

export default function post_order_search(head: BinaryNode<number>): number[] {
  const list: number[] = [];
  walk(head, list);
  return list;
}
