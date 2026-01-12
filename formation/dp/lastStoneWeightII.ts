// function lastStoneWeightII(stones: number[]): number {
//   const result = [Infinity];
//   helperStone(stones, result);
//   return result[0];
// }

// function helperStone(stones: number[], result: number[]): void {
//   if (stones.length === 1) {
//     result[0] = Math.min(stones[0], result[0]);
//     return;
//   }
//   for (let i = 0; i < stones.length; i++) {
//     for (let j = i + 1; j < stones.length; j++) {
//       const diff = Math.abs(stones[i] - stones[j]);
//       const newStones = [diff, ...removeAtIndices<number>(stones, [i, j])];
//       helperStone(newStones, result);
//     }
//   }
// }

// function removeAtIndices<T>(arr: T[], indices: number[]): T[] {
//   // Put indices into a Set for faster lookup
//   const removeSet = new Set(indices);

//   // Filter out the elements whose indices are in removeSet
//   return arr.filter((_, idx) => !removeSet.has(idx));
// }
