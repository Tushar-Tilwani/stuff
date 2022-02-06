/**
 * @param {number} n
 * @return {number[]}
 */
function grayCode(n) {
  const result = [];
  const initialVal = new Array(n).fill(0);
  const initialSet = new Set().add(initialVal.join(""));
  helper(n, [initialVal], initialSet, result);
  return result[0].map((bArr) => binaryArrToDecimal(bArr));
}

function helper(n, slate, set, result) {
  if (result.length > 0) {
    return;
  }
  if (slate.length === Math.pow(2, n)) {
    result.push(slate.map((val) => val.slice(0)));
    return;
  }

  const prevVal = slate[slate.length - 1];
  const newVal = prevVal.slice(0);

  for (let i = 0; i < n; i++) {
    newVal[i] = newVal[i] === 0 ? 1 : 0;

    const key = newVal.join("");

    // Back track;
    if (set.has(key)) {
      newVal[i] = newVal[i] === 0 ? 1 : 0;
      continue;
    }

    set.add(key);
    slate.push(newVal);
    helper(n, slate, set, result);
    slate.pop();
    set.delete(key);

    newVal[i] = newVal[i] === 0 ? 1 : 0;
  }
}

function binaryArrToDecimal(bArr) {
  const revArr = bArr.reverse();
  const len = bArr.length;

  let sum = 0;
  for (let i = 0; i < len; i++) {
    sum += revArr[i] * Math.pow(2, i);
  }
  return sum;
}

console.log(grayCode(3));
