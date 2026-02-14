export default function insertion_sort(arr: number[]): void {
  for (let i = 1; i < arr.length; ++i) {
    const curr = arr[i]!;
    let j = i - 1;
    while (j >= 0 && arr[j]! > curr) {
      arr[j + 1] = arr[j]!;
      --j;
    }
    arr[j + 1] = curr;
  }
}
