function reverseWords(str) {
  const strArr = str.split("");
  let left = 0;
  let right = 0;
  reverseWord(strArr, 0, strArr.length - 1);

  while (right < strArr.length) {
    if (strArr[right] === " ") {
      reverseWord(strArr, left, right - 1);
      left = right + 1;
    }
    right++;
  }
  reverseWord(strArr, left, right - 1);

  return strArr.join("");
}

function reverseWord(strArr, start, end) {
  let i = start,
    j = end;
  while (i < j) {
    const temp = strArr[i];
    strArr[i] = strArr[j];
    strArr[j] = temp;
    i++;
    j--;
  }
  return strArr;
}

let g = '  hello world!  ';
console.log(reverseWords(g, 0, 4));
