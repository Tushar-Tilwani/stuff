// function isInterleave(s1: string, s2: string, s3: string): boolean {
//   return helper(s1, 0, s2, 0, s3, 0, new Map());
// }

// function helper(
//   s1: string,
//   i1: number,
//   s2: string,
//   i2: number,
//   s3: string,
//   i3: number,
//   memo: Map<string, boolean>
// ): boolean {
//   const key = [i1, i2, i3].join();
//   if (memo.has(key)) {
//     return memo.get(key) as boolean;
//   }
//   while (i1 < s1.length && i2 < s2.length && i3 < s3.length) {
//     if (s1[i1] === s3[i3] && s2[i2] === s3[i3]) {
//       // we are not sure which path to take. So take both
//       const result = helper(s1, i1 + 1, s2, i2, s3, i3 + 1, memo) || helper(s1, i1, s2, i2 + 1, s3, i3 + 1, memo);
//       memo.set(key, result);
//       return result;
//     }
//     if (s1[i1] === s3[i3]) {
//       i1++;
//       i3++;
//       continue;
//     }

//     if (s2[i2] === s3[i3]) {
//       i2++;
//       i3++;
//       continue;
//     }
//     memo.set(key, false);
//     return false;
//   }

//   while (i1 < s1.length && i3 < s3.length) {
//     if (s1[i1] === s3[i3]) {
//       i1++;
//       i3++;
//       continue;
//     }
//     memo.set(key, false);
//     return false;
//   }
//   while (i2 < s2.length && i3 < s3.length) {
//     if (s2[i2] === s3[i3]) {
//       i2++;
//       i3++;
//       continue;
//     }
//     memo.set(key, false);
//     return false;
//   }

//   const result = i3 === s3.length && i2 === s2.length && i1 === s1.length;
//   memo.set(key, result);
//   return result;
// }
