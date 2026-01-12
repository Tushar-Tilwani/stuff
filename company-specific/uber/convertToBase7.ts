function convertToBase7(n: number): string {
  let num = Math.abs(n);
  if (num === 0) {
    return "0";
  }
  const nums = [];
  while (num > 0) {
    nums.push(num % 7);
    num = Math.floor(num / 7);
  }
  return `${n < 0 ? "-" : ""}${nums.reverse().join("")}`;
}
