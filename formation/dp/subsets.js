function numOfWays(n, k) {
  // Number of way to make community of k people from n people
  // equation C(n,k) = C(n-1, k) (Do  not Choose the person) +  C(n-1, k-1) (Choose the person)
  // 2-d DP table

  const TABLE = new Array(n + 1).fill(null).map(() => new Array(n + 1).fill(null));

  for (let i = 0; i <= n; i++) {
    // C(N,0) = 1. Choosing no person
    TABLE[i][0] = 1;
    // C(N,N) = 1. Choosing every person
    TABLE[i][i] = 1;
  }
  // C(n,k) = C(n-1, k) + C(n-1, k-1)

  for (let i = 2; i <= n; i++) {
    for (let j = 1; j < i; j++) {
      TABLE[i][j] = TABLE[i - 1][j] + TABLE[i - 1][j - 1];
    }
  }

  console.log(TABLE);

  return TABLE[n][k];
}

console.log(numOfWays(4, 2));
