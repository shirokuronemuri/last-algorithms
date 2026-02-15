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
    if (idx > this.length) {
      throw new Error('bwah');
    } else if (idx === 0) {
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

  removeAt(idx: number): T | undefined {
    if (idx >= this.length || idx < 0) {
      throw new Error('bwah');
    }
    if (idx === 0) {
      return this.shift();
    } else if (idx === this.length - 1) {
      return this.pop();
    } else {
      let curr = this.head;
      for (let i = 0; curr && i < idx; ++i) {
        curr = curr.next;
      }
      if (!curr) {
        return;
      }
      curr.prev!.next = curr.next;
      curr.next!.prev = curr.prev;
      curr.next = curr.prev = undefined;
      --this.length;
      return curr.value;
    }
  }

  remove(item: T): T | undefined {
    const curr = this.head;
    for (let i = 0; curr && i < this.length; ++i) {
      if (curr.value === item) {
        if (i === 0) {
          return this.shift();
        } else if (i === this.length - 1) {
          return this.pop();
        } else {
          curr.prev!.next = curr.next;
          curr.next!.prev = curr.prev;
          curr.next = curr.prev = undefined;
          --this.length;
          return curr.value;
        }
      }
    }
    return;
  }

  private shift(): T | undefined {
    --this.length;
    let value: T | undefined;
    if (this.head) {
      value = this.head.value;
      if (this.head.next) {
        this.head = this.head.next;
        this.head.prev = undefined;
      }
    }
    if (this.length === 0) {
      this.head = this.tail = undefined;
    }
    return value;
  }

  private pop(): T | undefined {
    --this.length;
    let value: T | undefined;
    if (this.tail) {
      value = this.tail.value;
      if (this.tail.prev) {
        this.tail = this.tail.prev;
        this.tail.next = undefined;
      }
    }
    if (this.length === 0) {
      this.head = this.tail = undefined;
    }
    return value;
  }

  get(idx: number): T | undefined {
    let curr = this.head;
    for (let i = 0; curr && i < idx; ++i) {
      curr = curr.next;
    }
    return curr?.value;
  }
}
