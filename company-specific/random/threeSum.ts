function threeSum(nums: number[]): number[][] {
  const sortedNums = nums.sort((a, b) => a - b);
  const result: number[][] = [];
  for (let i = 0; i < sortedNums.length; i++) {
    const tuples = twoSum(sortedNums, i);
    const triplets = tuples.map((tuple) => [sortedNums[i], ...tuple]);
    result.push(...triplets);
  }

  // de-dupe
  //   Array.from(new Set(result.map((r) => r.join(""))).values()).map((val) => val.split(",").map(parseInt));

  return dedupe(result);
}

function dedupe(result: number[][]) {
  const unique = Array.from(new Set(result.map((r) => r.sort((a, b) => a - b).join(","))).values());
  const numUnique = unique.map((str) => str.split(",").map((char) => parseInt(char)));
  return numUnique;
}

function twoSum(sortedNums: number[], targetIndex: number, start: number = 0, end: number = sortedNums.length - 1) {
  const target = -sortedNums[targetIndex];
  const result: [number, number][] = [];
  // skip index 0 as that's the target
  while (start < end) {
    const sum = sortedNums[start] + sortedNums[end];

    if (sum < target || start === targetIndex) {
      start++;
      continue;
    }

    if (sum > target || end === targetIndex) {
      end--;
      continue;
    }

    // if equal delegate. Since there are equals
    result.push([sortedNums[start], sortedNums[end]]);
    while (sortedNums[start] === sortedNums[start + 1]) {
      start++;
    }
    while (sortedNums[end] === sortedNums[end - 1]) {
      end--;
    }
    start++;
    end--;
  }
  return result;
}
