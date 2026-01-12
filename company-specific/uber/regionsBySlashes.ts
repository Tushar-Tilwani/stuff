function regionsBySlashes(grid: string[]): number {
  const n = grid.length;
  const regions = 4 * n * n;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if(grid[i][j] === ' '){

        }
    }
  }
  return 0;
}

function find(){

}

function union(){

}

const getId = (row: number, col: number, part: number, n: number) => {
  return (n * row + col) * 4 + part;
};
