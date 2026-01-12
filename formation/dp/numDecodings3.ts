// const MOD = Math.pow(10, 9) + 7;
// function getCount(char: string) {
//   if (char === "0") {
//     return 0;
//   }
//   if (char === "*") {
//     return 9;
//   }
//   return 1;
// }

// function getCountForTwoDigits(char: string) {
//   if (char.startsWith("0")) {
//     return 0;
//   }
//   const lastChar = char.slice(-1);

//   if (char.startsWith("*")) {
//     if (lastChar === "*") {
//       return 15;
//     }
//     const lastDigit = parseInt(lastChar);
//     return lastDigit > 6 ? 1 : 2;
//   }

//   const firstDigit = parseInt(char[0]);
//   if (lastChar === "*") {
//     if (firstDigit === 1) {
//       return 9;
//     }

//     if (firstDigit === 2) {
//       return 6;
//     }

//     return 0;
//   }

//   const val = parseInt(char);
//   return val < 10 || val > 26 ? 0 : 1;
// }

// function numDecodings(s: string): number {
//   const len = s.length;
//   const TABLE = new Array(len + 1).fill(0);
//   TABLE[0] = 1;
//   TABLE[1] = getCount(s[0]);

//   for (let i = 2; i <= len; i++) {
//     // on digit
//     TABLE[i] += getCount(s[i - 1]) * TABLE[i - 1];
//     TABLE[i] += getCountForTwoDigits(s.substring(i - 2, i)) * TABLE[i - 2];
//     TABLE[i] %= MOD;
//   }

//   console.log(TABLE);

//   return TABLE[len];
// }
