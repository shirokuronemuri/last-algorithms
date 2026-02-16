const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
] as const;

const walk = (
  maze: string[],
  wall: string,
  curr: Point,
  end: Point,
  seen: boolean[][],
  path: Point[],
) => {
  const mazeRow = maze[curr.y];
  const seenRow = seen[curr.y];
  if (!mazeRow || curr.x < 0 || curr.x >= mazeRow.length || curr.y < 0 || curr.y >= maze.length) {
    return false;
  }
  if (!seenRow || seenRow[curr.x]) {
    return false;
  }
  if (mazeRow[curr.x] === wall) {
    return false;
  }
  if (curr.x === end.x && curr.y === end.y) {
    path.push(end);
    return true;
  }

  seenRow[curr.x] = true;
  path.push(curr);

  for (const [x, y] of dir) {
    if (walk(maze, wall, { x: curr.x + x, y: curr.y + y }, end, seen, path)) {
      return true;
    }
  }

  path.pop();

  return false;
};

export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
  const path: Point[] = [];
  const seen: boolean[][] = [];
  for (let i = 0; i < maze.length; ++i) {
    seen.push(new Array(maze[0]!.length).fill(false));
  }
  walk(maze, wall, start, end, seen, path);
  return path;
}
