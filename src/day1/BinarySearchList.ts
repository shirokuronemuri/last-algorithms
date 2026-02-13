export default function bs_list(haystack: number[], needle: number): boolean {
  let lo = 0;
  let hi = haystack.length;
  while (lo < hi) {
    const m = Math.floor(lo + (hi - lo) / 2);
    if (needle === haystack[m]) {
      return true;
    } else if (haystack[m] !== undefined && needle < haystack[m]) {
      hi = m;
    } else if (haystack[m] !== undefined && needle > haystack[m]) {
      lo = m + 1;
    }
  }
  return false;
}
