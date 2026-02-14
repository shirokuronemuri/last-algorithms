export default function two_crystal_balls(breaks: boolean[]): number {
  const jumpLength = Math.floor(Math.sqrt(breaks.length));
  let i = jumpLength;
  for (i; i < breaks.length; i += jumpLength) {
    if (breaks[i]) {
      i -= jumpLength;
      break;
    }
  }

  for (i; i < breaks.length; ++i) {
    if (breaks[i]) return i;
  }

  return -1;
}
