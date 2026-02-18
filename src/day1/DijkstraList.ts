const hasUnvisitedNodes = (seen: boolean[], dists: number[]): boolean => {
  return seen.some((v, i) => !v && dists[i]! < Infinity);
};

const getLowestUnvisited = (seen: boolean[], dists: number[]): number => {
  let lowestDistance = Infinity;
  let idx = -1;

  for (let i = 0; i < seen.length; ++i) {
    if (!seen[i] && dists[i]! < lowestDistance) {
      lowestDistance = dists[i]!;
      idx = i;
    }
  }
  return idx;
};

export default function dijkstra_list(
  source: number,
  sink: number,
  arr: WeightedAdjacencyList,
): number[] {
  const seen: boolean[] = new Array(arr.length).fill(false);
  const dists: number[] = new Array(arr.length).fill(Infinity);
  const prev: number[] = new Array(arr.length).fill(-1);
  dists[source] = 0;
  while (hasUnvisitedNodes(seen, dists)) {
    const curr = getLowestUnvisited(seen, dists);
    seen[curr] = true;

    const adjs = arr[curr]!;
    for (const edge of adjs) {
      if (seen[edge.to]) continue;
      const dist = dists[curr]! + edge.weight;
      if (dist < dists[edge.to]!) {
        dists[edge.to] = dist;
        prev[edge.to] = curr;
      }
    }
  }

  const path: number[] = [];
  let curr = sink;
  while (prev[curr] !== -1) {
    path.unshift(curr);
    curr = prev[curr]!;
  }
  path.unshift(source);
  return path;
}
