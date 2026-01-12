// function isInterleave(s1: string, s2: string, s3: string): boolean {
//   return helper(s1, 0, s2, 0, s3, 0);
// }

// function helper(s1: string, i1: number, s2: string, i2: number, s3: string, i3: number): boolean {
//   while (i1 < s1.length && i2 < s2.length && i3 < s3.length) {
//     if (s1[i1] === s3[i3] && s2[i2] === s3[i3]) {
//       // we are not sure which path to take. So take both
//       return helper(s1, i1 + 1, s2, i2, s3, i3 + 1) || helper(s1, i1, s2, i2 + 1, s3, i3 + 1);
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
//     return false;
//   }

//   while (i1 < s1.length && i3 < s3.length) {
//     if (s1[i1] === s3[i3]) {
//       i1++;
//       i3++;
//       continue;
//     }
//     return false;
//   }
//   while (i2 < s2.length && i3 < s3.length) {
//     if (s2[i2] === s3[i3]) {
//       i2++;
//       i3++;
//       continue;
//     }
//     return false;
//   }

//   return i3 === s3.length && i2 === s2.length && i1 === s1.length;
// }
