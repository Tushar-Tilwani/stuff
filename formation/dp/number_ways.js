function number_ways(n, faces, target) {
  const TABLE = new Array(n + 1).fill(null).map(() => new Array(target + 1).fill(0));
  for (let j = 1; j <= faces; j++) {
    TABLE[1][j] = 1;
  }

  for (let i = 2; i <= n; i++) {
    for (let sum = 1; sum <= target; sum++) {
      let ways = 0;
      for (let face = 1; face <= faces; face++) {
        if(sum - face <= 0){
            continue;
        }
        ways += TABLE[i - 1][sum - face];
      }
      TABLE[i][sum] = ways;
    }
  }

  return TABLE[n][target];
}

console.log(number_ways(1, 6, 3) , 1);
console.log(number_ways(3, 6, 7) , 15);
console.log(number_ways(2, 5, 8) , 3);
