function maxRepOpt1(text: string): number {
  const textArr = text.split("");
  const frequency = textArr.reduce((acc, char) => {
    acc.set(char, (acc.get(char) ?? 0) + 1);
    return acc;
  }, new Map<string, number>());

  let broke = false;
  let max = 0;
  let i = 0;
  const candidates = [];
  let count = 0;
  while (i < textArr.length) {
    const previousChar = textArr[i - 1];
    const currentChar = textArr[i];
    const nextChar = textArr[i + 1];

    if (previousChar === nextChar && currentChar !== previousChar) {
      candidates.push(i);
    }

    if (previousChar === currentChar) {
      count++;
    } else {
      count === 0;
    }

    i++;
  }
  console.log(candidates);
  return max;
}
