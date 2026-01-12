function checkRecord(s: string): boolean {
  //The student was absent ('A') for strictly fewer than 2 days total.
  let aCount = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "A") {
      aCount++;
    }
  }

  let lCon = false;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "L" && s[i - 1] === "L" && s[i + 1] === "L") {
      lCon = true;
      break;
    }
  }

  return aCount < 3 && !lCon;
}
