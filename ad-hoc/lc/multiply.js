/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
  const intConversion = v => parseInt(v);
  const numArr1 = num1.split("").map(intConversion);
  const numArr2 = num2.split("").map(intConversion);
  const resultArr = [];
  const n2Len = numArr2.length - 1;

  for (let i = n2Len; i >= 0; i--) {
    const singleDigit = numArr2[i];
    const singleMul = multiply1(numArr1, singleDigit);

    for (let j = 0; j < n2Len - i; j++) {
      singleMul.unshift(0);
    }

    resultArr.push(singleMul);
  }

  return addAll(resultArr)
    .reverse()
    .join("");
};

function multiply1(numArr, singleDigit) {
  const result = [];
  let acc = 0;
  for (let i = numArr.length - 1; i >= 0; i--) {
    const digit = numArr[i];
    const singleProduct = digit * singleDigit + acc;
    acc = Math.floor(singleProduct / 10);
    result.push(singleProduct % 10);
  }
  if (acc !== 0) {
    result.push(acc);
  }

  return result;
}

function addAll(arr) {
  const maxLen = Math.max(...arr.map(val => val.length));
  const result = [];
  let acc = 0;
  for (let i = 0; i < maxLen; i++) {
    let digit = acc;
    for (let j = 0; j < arr.length; j++) {
      digit += arr[j][i] || 0;
    }
    acc = Math.floor(digit / 10);
    result.push(digit % 10);
  }

  if (acc !== 0) {
    result.push(acc);
  }

  return result;
}

console.log(multiply("327", "32"));
console.log(multiply("123", "456"));
