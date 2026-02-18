export default function bfs(
  graph: WeightedAdjacencyList,
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
    for (const edge of adjs) {
      if (seen[edge.to]) {
        continue;
      }
      seen[edge.to] = true;
      prev[edge.to] = curr;
      q.push(edge.to);
    }
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
