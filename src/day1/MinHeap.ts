export default class MinHeap {
  public length: number;
  private data: (number | undefined)[];

  constructor() {
    this.data = [];
    this.length = 0;
  }

  insert(value: number): void {
    this.data[this.length] = value;
    this.heapifyUp(this.length);
    ++this.length;
  }
  delete(): number | undefined {
    if (this.length === 0) {
      return undefined;
    }

    const value = this.data[0];
    --this.length;
    if (this.length === 0) {
      this.data = [];
      return value;
    }

    this.data[0] = this.data[this.length];
    this.heapifyDown(0);
    return value;
  }

  private heapifyUp(idx: number): void {
    if (idx === 0) {
      return;
    }

    const parent = this.parent(idx);
    const parentValue = this.data[parent]!;
    const value = this.data[idx]!;
    if (value < parentValue) {
      this.data[parent] = value;
      this.data[idx] = parentValue;
      this.heapifyUp(parent);
    }
  }

  private heapifyDown(idx: number): void {
    const lChild = this.leftChild(idx);
    const rChild = this.rightChild(idx);

    if (idx >= this.length || lChild >= this.length) {
      return;
    }
    const lChildValue = this.data[lChild]!;
    const rChildValue = this.data[rChild]!;
    const value = this.data[idx]!;

    if (rChildValue > lChildValue && value > lChildValue) {
      this.data[lChild] = value;
      this.data[idx] = lChildValue;
      this.heapifyDown(lChild);
    } else if (lChildValue > rChildValue && value > rChildValue) {
      this.data[rChild] = value;
      this.data[idx] = rChildValue;
      this.heapifyDown(rChild);
    }
  }

  private parent(idx: number): number {
    return Math.floor((idx - 1) / 2);
  }

  private leftChild(idx: number): number {
    return idx * 2 + 1;
  }
  private rightChild(idx: number): number {
    return idx * 2 + 2;
  }
}
