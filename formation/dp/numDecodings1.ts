// const MIN = 1;
// const MAX = 26;

// function numDecodings(s: string): number {
//   return helper(s, 0, new Map());
// }

// function helper(s: string, index: number, memo: Map<number, number>) {
//   if (index === s.length) {
//     return 1;
//   }
//   if (memo.has(index)) {
//     return memo.get(index) ?? 0;
//   }
//   let sum = 0;
//   for (let i = index + 1; i <= s.length; i++) {
//     const str = s.substring(index, i);
//     const val = parseInt(str);
//     if (val > MAX || val < MIN || str.startsWith("0")) {
//       continue;
//     }
//     sum += helper(s, i, memo);
//   }
//   memo.set(index, sum);
//   return sum;
// }
