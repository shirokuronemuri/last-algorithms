type Node<T> = {
  value: T;
  next?: Node<T>;
};
export default class SinglyLinkedList<T> {
  public length: number;
  private head?: Node<T>;

  constructor() {
    this.length = 0;
  }

  prepend(item: T): void {
    const node = { value: item } as Node<T>;
    if (this.head) {
      node.next = this.head;
    }
    this.head = node;
    ++this.length;
  }

  append(item: T): void {
    const node = { value: item } as Node<T>;
    if (!this.head) {
      this.prepend(item);
      return;
    }
    let curr = this.head;
    for (let i = 0; curr; ++i) {
      if (!curr.next) {
        curr.next = node;
        break;
      }
      curr = curr.next;
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
    for (let i = 0; curr && i < idx - 1; ++i) {
      curr = curr.next;
    }
    if (!curr) {
      throw new Error('bwah');
    }
    if (curr.next) {
      node.next = curr.next;
    }
    curr.next = node;
    ++this.length;
  }

  get(idx: number): T | undefined {
    let curr = this.head;
    for (let i = 0; curr && i < idx; ++i) {
      curr = curr.next;
    }
    return curr?.value;
  }

  remove(item: T): T | undefined {
    const curr = this.head;
    if (this.head && this.head.value === item) {
      --this.length;
      const value = this.head.value;
      this.head = this.head.next;
      return value;
    }
    for (let i = 0; curr && i < this.length - 1; ++i) {
      const next = curr.next;
      if (next && next.value === item) {
        --this.length;
        curr.next = next.next;
        next.next = undefined;
        if (this.length === 0) {
          this.head = undefined;
        }
        return next.value;
      }
    }
    return;
  }

  removeAt(idx: number): T | undefined {
    if (idx >= this.length || idx < 0) {
      throw new Error('bwah');
    }
    let curr = this.head;
    for (let i = 0; curr && i < idx - 1; ++i) {
      curr = curr.next;
    }
    if (!curr) {
      throw new Error('bwah');
    }
    --this.length;
    if (this.length === 0) {
      const value = this.head?.value;
      this.head = undefined;
      return value;
    }
    if (idx === 0) {
      const value = this.head?.value;
      this.head = this.head?.next;
      return value;
    } else {
      const removedItem = curr.next;
      curr.next = removedItem?.next;
      return removedItem?.value;
    }
  }
}
