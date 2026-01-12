// const MIN = 1;
// const MAX = 26;

// function numDecodings(s: string): number {
//   const result: number[][] = [];
//   helper(s, 0, [], result);
//   console.log(result);
//   return result.length;
// }

// function helper(s: string, index: number, path: number[], result: number[][]) {
//   if (index === s.length) {
//     result.push(path.slice(0));
//     return;
//   }
//   for (let i = index + 1; i <= s.length; i++) {
//     const str = s.substring(index, i);
//     const val = parseInt(str);
//     if (val > MAX || val < MIN || str.startsWith("0")) {
//       continue;
//     }
//     path.push(val);
//     helper(s, i, path, result);
//     path.pop();
//   }
// }
