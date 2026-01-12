function isLongPressedName(name: string, typed: string): boolean {
  let i = 0;
  let j = 0;
  while (i < name.length && j < typed.length) {
    if (name[i] === typed[j]) {
      i++;
      j++;
      continue;
    }

    if (typed[j] === name[i - 1]) {
      j++;
      continue;
    }

    return false;
  }

  return i == name.length && j === typed.length;
}
