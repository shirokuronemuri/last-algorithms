export default class RingBuffer<T> {
  public length: number;
  private head: number;
  private tail: number;
  private capacity: number;
  private arr: (T | undefined)[];

  constructor() {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
    this.capacity = 8;
    this.arr = new Array(this.capacity);
  }

  increaseCapacityIfNeeded() {
    if (this.head === this.tail && this.length === this.capacity) {
      const oldCapacity = this.capacity;
      this.capacity *= 2;
      const newArr = new Array(this.capacity);
      for (let i = 0; i <= this.length; ++i) {
        newArr[i] = this.arr[(this.head + i) % oldCapacity];
      }
      this.head = 0;
      this.tail = this.length;
      this.arr = newArr;
    }
  }
  output() {
    console.log(this.arr);
    console.log(`head: ${this.head}, tail: ${this.tail}, len: ${this.length}`);
  }

  get(idx: number): T | undefined {
    return this.arr[(this.head + idx) % this.capacity];
  }

  push(item: T): void {
    this.increaseCapacityIfNeeded();
    this.arr[this.tail] = item;
    this.tail = (this.tail + 1) % this.capacity;
    ++this.length;
  }

  pop(): T | undefined {
    if (this.length === 0) {
      return;
    }
    this.tail = (this.tail - 1 + this.capacity) % this.capacity;
    --this.length;
    return this.arr[this.tail];
  }
}
