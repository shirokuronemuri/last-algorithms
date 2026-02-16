export default class ArrayList<T> {
  private arr: (T | undefined)[];
  public length: number;
  private capacity: number;

  constructor(capacity?: number) {
    this.length = 0;
    this.capacity = capacity ?? 5;
    this.arr = new Array(this.capacity);
  }

  private increaseCapacityIfNeeded() {
    if (this.capacity === this.length) {
      this.capacity *= 2;
      const newArr = new Array(this.capacity);
      for (let i = 0; i < this.length; ++i) {
        newArr[i] = this.arr[i];
      }
      this.arr = newArr;
    }
  }

  prepend(item: T): void {
    this.insertAt(item, 0);
  }

  insertAt(item: T, idx: number): void {
    this.increaseCapacityIfNeeded();
    for (let i = this.length; i > idx; --i) {
      this.arr[i] = this.arr[i - 1];
    }
    this.arr[idx] = item;
    ++this.length;
  }

  append(item: T): void {
    this.increaseCapacityIfNeeded();
    this.arr[this.length] = item;
    ++this.length;
  }

  get(idx: number): T | undefined {
    if (idx < 0 || idx >= this.capacity) {
      return undefined;
    }
    return this.arr[idx];
  }

  remove(item: T): T | undefined {
    let removedIdx = -1;
    for (let i = 0; i < this.length; ++i) {
      if (this.arr[i] === item) {
        removedIdx = i;
        break;
      }
    }
    if (removedIdx === -1) {
      return;
    }
    return this.removeAt(removedIdx);
  }

  removeAt(idx: number): T | undefined {
    const value = this.arr[idx];
    for (let i = idx; i < this.length - 1; ++i) {
      this.arr[i] = this.arr[i + 1];
    }
    --this.length;
    return value;
  }
}
