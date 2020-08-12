export const false2DArray = (row: number, col: number): boolean[][] => {
  const res: boolean[][] = [];

  for (let i = 0; i < row; i++) {
    res.push([]);
    for (let j = 0; j < col; j++) {
      res[i].push(false);
    }
  }
  return res;
}