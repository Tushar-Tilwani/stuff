const getTemplate = (index: number, total: number) => `<${index}/${total}>`;
function splitMessage(message: string, limit: number): string[] {
  const parts = getParts(message, limit);
  console.log("getParts", parts);
  const result = [];
  let strIndex = 0;
  for (let i = 0; i < parts; i++) {
    const template = getTemplate(i + 1, parts);
    const charLen = limit - template.length;
    const substr = message.substring(strIndex, strIndex + charLen);
    result.push(`${substr}${template}`);
    strIndex += charLen;
  }

  return result;
}

function getParts(message: string, limit: number) {
  let start = 1;
  let end = message.length;
  for (let i = start; i < end; i++) {
    if (isPossible(i, message, limit)) {
      return i;
    }
  }
  //   while (start <= end) {
  //     const mid = Math.floor((end - start) / 2) + start;
  //     if (isPossible(mid, message, limit)) {
  //       end = mid - 1;
  //     } else {
  //       start = mid + 1;
  //     }
  //   }
  return Infinity;
}

function isPossible(numOfParts: number, message: string, limit: number) {
  const digitCounts = getCountDigits(numOfParts);
  let totalLength = 0;
  for (let i = 0; i < digitCounts.length; i++) {
    const templateLen = getTemplate(1 * Math.pow(10, i), numOfParts).length;
    const charLen = limit - templateLen;
    if (charLen <= 0) return false;
    // count chars we can store for a numbe of ith digits
    totalLength += charLen * digitCounts[i];
  }

  return totalLength >= message.length;
}

function getCountDigits(numOfParts: number) {
  const result = [];
  let start = 9;
  while (numOfParts > 0) {
    result.push(Math.min(start, numOfParts));
    numOfParts -= start;
    start *= 10;
  }
  return result;
}
