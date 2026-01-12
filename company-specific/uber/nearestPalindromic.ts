function nearestPalindromic(n: string): string {
  const num = BigInt(n);

  if (num < 10n) {
    // n is "0".."9"
    return (num - 1n).toString();
  }
  if (num < 12n) {
    // "10" or "11" → nearest pal is "9"
    return "9";
  }

  const values = getCandidates(n).map(makePalindrome).map(BigInt);

  const BIG_INF = BigInt(Number.MAX_SAFE_INTEGER) ** 10n;

  const [, result] = values.reduce<[bigint, bigint]>(
    (acc, newVal) => {
      const [minDiff, minVal] = acc;
      const newDiff = absBigInt(num - newVal); // custom abs for bigint

      if (newDiff === 0n) {
        return acc;
      }
      if (newDiff < minDiff) {
        return [newDiff, newVal];
      }
      if (newDiff === minDiff && newVal < minVal) {
        return [newDiff, newVal];
      }
      return acc;
    },
    [BIG_INF, BIG_INF]
  );

  return result.toString();
}

function absBigInt(x: bigint): bigint {
  return x < 0n ? -x : x;
}

function getCandidates(n: string): string[] {
  const len = n.length;
  const mid = len % 2 === 0 ? len / 2 - 1 : Math.floor(len / 2);
  const candidates: string[] = [];

  // Work with a middle digit as bigint
  let strArr = n.split("");
  const midVal = BigInt(strArr[mid]);

  // +1 at middle digit or bump by 10^mid
  if (midVal < 9n) {
    strArr[mid] = (midVal + 1n).toString();
    candidates.push(strArr.join(""));
  } else {
    const delta = 10n ** BigInt(mid); // bigint power, no Math.pow
    candidates.push((BigInt(n) + delta).toString());
  }

  // -1 at middle digit or subtract 10^mid
  strArr = n.split("");
  if (midVal > 0n) {
    strArr[mid] = (midVal - 1n).toString();
    candidates.push(strArr.join(""));
  } else {
    const delta = 10n ** BigInt(mid);
    candidates.push((BigInt(n) - delta).toString());
  }

  // n + 1, n - 1
  candidates.push((BigInt(n) + 1n).toString());
  candidates.push((BigInt(n) - 1n).toString());

  return candidates;
}

function makePalindrome(n: string): string {
  const str = n.split("");
  const end = str.length - 1;
  const mid = Math.floor(str.length / 2);

  for (let i = 0; i < mid; i++) {
    str[end - i] = str[i];
  }

  return str.join("");
}
