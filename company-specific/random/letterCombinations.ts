const DIGIT: Record<string, string> = {
  2: "abc",
  3: "def",
  4: "ghi",
  5: "jkl",
  6: "mno",
  7: "pqrs",
  8: "tuv",
  9: "wxyz",
};

function letterCombinations(digits: string): string[] {
  const result: string[] = [];
  helper(digits, 0, [], result);
  return result;
}

function helper(digits: string, index: number, plate: string[], result: string[]) {
  if (index === digits.length) {
    result.push(plate.join(""));
    return;
  }
  const chars = DIGIT[digits[index]] ?? "";
  for (let i = 0; i < chars.length; i++) {
    plate.push(chars[i]);
    helper(digits, index + 1, plate, result);
    plate.pop();
  }
}
