type Node<T> = {
  value: T;
  prev?: Node<T>;
};

export default class Stack<T> {
  public length: number;
  head?: Node<T>;

  constructor() {
    this.length = 0;
  }

  push(item: T): void {
    const node = { value: item } as Node<T>;
    node.prev = this.head;
    this.head = node;
    ++this.length;
  }
  pop(): T | undefined {
    const value = this.head?.value;
    this.head = this.head?.prev;
    if (this.length > 0) {
      --this.length;
    }
    return value;
  }
  peek(): T | undefined {
    return this.head?.value;
  }
}
