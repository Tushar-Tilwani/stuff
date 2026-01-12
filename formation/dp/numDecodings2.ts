// function numDecodings(s: string): number {
//   const length = s.length;
//   const TABLE = new Array(length + 1).fill(0);
//   // Base case
//   TABLE[0] = 1;
//   TABLE[1] = s[0] !== "0" ? 1 : 0;

//   for (let i = 2; i <= length; i++) {
//     // single digit
//     TABLE[i] += s[i] === "0" ? 0 : TABLE[i - 1];

//     //double digit
//     const str = s.substring(i - 2, i);
//     const val = parseInt(str);
//     TABLE[i] += val > 26 || val < 10 ? 0 : TABLE[i - 2];
//   }

//   return TABLE[length];
// }
