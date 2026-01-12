function divisorGame(n: number): boolean {
  return dfs(n, true);
}

function dfs(n: number, isAlice: boolean) {
  if (n === 1) {
    return !isAlice;
  }

  for (let i = 1; i < n; i++) {
    if (n % i !== 0) {
      continue;
    }
    if (isAlice) {
      if (dfs(n - i, !isAlice)) {
        return true;
      }
    } else {
      // bob wants to optimize false
      if (!dfs(n - i, !isAlice)) {
        return false;
      }
    }
  }
  return false;
}
