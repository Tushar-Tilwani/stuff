function cutRod(prices, n) {
  //code here
  const TABLE = new Array(n + 1).fill(-Infinity);
  TABLE[0] = 0;
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      TABLE[i] = Math.max(TABLE[i], TABLE[j] + prices[i - j - 1]);
    }
  }

  return TABLE[n];
}

console.log(cutRod([1, 5, 8, 9, 10, 17, 17, 20], 8));

console.log(cutRod([3, 5, 8, 9, 10, 17, 17, 20], 8));
