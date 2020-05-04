/**
 * @param {number[][]} dungeon
 * @return {number}
 */
var calculateMinimumHP = function(dungeon) {
  const MIN_TABLE = [];
  const VALUE_TABLE = [];
  const PATH_TABLE = [];

  const MAX_ROW = dungeon.length;
  const MAX_COL = dungeon[0].length;

  for (let i = 0; i < MAX_ROW; i++) {
    MIN_TABLE[i] = [];
    VALUE_TABLE[i] = [];
    PATH_TABLE[i] = [];
    for (let j = 0; j < MAX_COL; j++) {
      MIN_TABLE[i][j] = Infinity;
      PATH_TABLE[i][j] = Infinity;
      VALUE_TABLE[i][j] = 0;
    }
  }

  VALUE_TABLE[0][0] = dungeon[0][0];
  MIN_TABLE[0][0] = dungeon[0][0];
  PATH_TABLE[0][0] = dungeon[0][0];

  for (let i = 1; i < MAX_ROW; i++) {
    VALUE_TABLE[i][0] = VALUE_TABLE[i - 1][0] + dungeon[i][0];
    PATH_TABLE[i][0] = VALUE_TABLE[i][0];
    MIN_TABLE[i][0] = Math.min(
      VALUE_TABLE[i - 1][0] + dungeon[i][0],
      MIN_TABLE[i - 1][0]
    );
  }

  for (let j = 1; j < MAX_COL; j++) {
    VALUE_TABLE[0][j] = VALUE_TABLE[0][j - 1] + dungeon[0][j];
    PATH_TABLE[0][j] = VALUE_TABLE[0][j];
    MIN_TABLE[0][j] = Math.min(
      VALUE_TABLE[0][j - 1] + dungeon[0][j],
      MIN_TABLE[0][j - 1]
    );
  }

  for (let i = 1; i < MAX_ROW; i++) {
    for (let j = 1; j < MAX_COL; j++) {
      PATH_TABLE[i][j] =
        Math.max(PATH_TABLE[i][j - 1], PATH_TABLE[i - 1][j]) + dungeon[i][j];
      VALUE_TABLE[i][j] =
        MIN_TABLE[i - 1][j] > MIN_TABLE[i][j - 1]
          ? VALUE_TABLE[i - 1][j]
          : VALUE_TABLE[i][j - 1];
      VALUE_TABLE[i][j] += dungeon[i][j];

      MIN_TABLE[i][j] = Math.max(MIN_TABLE[i][j - 1], MIN_TABLE[i - 1][j]);
      MIN_TABLE[i][j] = Math.min(
        MIN_TABLE[i][j],
        MIN_TABLE[i][j] + dungeon[i][j]
      );
    }
  }

  //   return -1 * (VALUE_TABLE[MAX_ROW - 1][MAX_COL - 1] - 1);
  return PATH_TABLE;
};

let dungeon = [
  [-2, -3, 3],
  [-5, -10, 1],
  [10, 30, -5]
];

// dungeon = [[-3, 5]];
console.log(calculateMinimumHP(dungeon));
