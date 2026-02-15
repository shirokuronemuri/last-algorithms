type Node<T> = {
  value: T;
  prev?: Node<T>;
  next?: Node<T>;
};
export default class DoublyLinkedList<T> {
  public length: number;
  private head?: Node<T>;
  private tail?: Node<T>;

  constructor() {
    this.length = 0;
  }

  prepend(item: T): void {
    const node = { value: item } as Node<T>;
    if (this.head) {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    } else {
      this.head = this.tail = node;
    }
    ++this.length;
  }

  append(item: T): void {
    const node = { value: item } as Node<T>;
    if (this.tail) {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    } else {
      this.head = this.tail = node;
    }
    ++this.length;
  }

  insertAt(item: T, idx: number): void {
    const node = { value: item } as Node<T>;
    if (idx < 0 || idx > this.length) {
      throw new Error('bwah');
    }
    if (idx === 0) {
      this.prepend(item);
      return;
    } else if (idx === this.length) {
      this.append(item);
      return;
    }

    let curr = this.head;
    for (let i = 0; curr && i < idx; ++i) {
      curr = curr.next;
    }
    if (!curr) {
      throw new Error('bwah');
    }
    const prev = curr.prev!;
    prev.next = node;
    node.prev = prev;
    node.next = curr;
    curr.prev = node;
    ++this.length;
  }

  removeNode(node: Node<T>): T | undefined {
    --this.length;
    if (this.length === 0) {
      this.head = this.tail = undefined;
      return node.value;
    }

    if (node.prev) {
      node.prev.next = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    }
    if (node === this.head) {
      this.head = node.next;
    }
    if (node === this.tail) {
      this.tail = node.prev;
    }
    node.next = node.prev = undefined;
    return node.value;
  }

  removeAt(idx: number): T | undefined {
    if (idx >= this.length || idx < 0) {
      throw new Error('bwah');
    }
    let curr = this.head;
    for (let i = 0; curr && i < idx; ++i) {
      curr = curr.next;
    }
    if (!curr) {
      throw new Error('bwah');
    }
    return this.removeNode(curr);
  }

  remove(item: T): T | undefined {
    const curr = this.head;
    for (let i = 0; curr && i < this.length; ++i) {
      if (curr.value === item) {
        return this.removeNode(curr);
      }
    }
    return;
  }

  get(idx: number): T | undefined {
    let curr = this.head;
    for (let i = 0; curr && i < idx; ++i) {
      curr = curr.next;
    }
    return curr?.value;
  }
}
