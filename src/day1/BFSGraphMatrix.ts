export default function bfs(
  graph: WeightedAdjacencyMatrix,
  source: number,
  needle: number,
): number[] | null {
  const seen: boolean[] = new Array(graph.length).fill(false);
  const prev: number[] = new Array(graph.length).fill(-1);

  seen[source] = true;
  const q: number[] = [source];
  while (q.length > 0) {
    const curr = q.shift()!;
    if (curr === needle) {
      break;
    }

    const adjs = graph[curr]!;
    for (let i = 0; i < adjs.length; ++i) {
      if (adjs[i] === 0 || seen[i]) {
        continue;
      }
      seen[i] = true;
      prev[i] = curr;
      q.push(i);
    }
    seen[curr] = true;
  }

  if (!seen[needle]) {
    return null;
  }

  let curr = needle;
  const path: number[] = [];
  while (prev[curr] !== -1) {
    path.unshift(curr);
    curr = prev[curr]!;
  }
  path.unshift(source);
  return path;
}
