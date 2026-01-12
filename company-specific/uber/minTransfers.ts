function minTransfers(transactions: number[][]): number {
  const amountMap = new Map<number, number>();
  for (const [from, to, amount] of transactions) {
    amountMap.set(from, (amountMap.get(from) ?? 0) - amount);
    amountMap.set(to, (amountMap.get(to) ?? 0) + amount);
  }
  const values = Array.from(amountMap.entries()).filter(([, amount]) => amount !== 0);
  console.log(values);

  return 0;
}

// function dfs(values: [number, number][], index: number, result: [number]) {
//   if (index === values.length) {
//     return;
//   }
// }
