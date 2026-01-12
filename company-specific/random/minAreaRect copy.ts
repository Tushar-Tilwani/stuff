function minAreaRect(points: number[][]): number {
  const xMap = new Map<number, number[]>();

  for (const [x, y] of points) {
    const yPoints = xMap.get(x) ?? [];
    yPoints.push(y);
    xMap.set(x, yPoints);
  }
  cleanMap(xMap);

  if (xMap.size < 2) {
    // not possible
    return 0;
  }

  const candidates = findCandidates(xMap);
  console.log("candidates", xMap, candidates);

  const result = candidates.reduce((acc, { x, y }) => {
    const [x1, x2] = x;
    const [y1, y2] = y;
    const area = Math.abs(x2 - x1) * Math.abs(y2 - y1);

    return Math.min(area, acc);
  }, Infinity);

  return Number.isFinite(result) ? result : 0;
}

function cleanMap(pMap: Map<number, number[]>) {
  for (const [key, values] of pMap.entries()) {
    if (values.length < 2) {
      pMap.delete(key);
    }
  }
}

function findCandidates(pMap: Map<number, number[]>) {
  const candidates: { x: number[]; y: number[] }[] = [];
  const entries = Array.from(pMap.entries());
  for (let i = 0; i < entries.length; i++) {
    const [iKey, iValues] = entries[i];
    for (let j = i + 1; j < entries.length; j++) {
      const [jKey, jValues] = entries[j];
      const unioun = findUnion(iValues, jValues);
      if (unioun) {
        candidates.push({ x: [iKey, jKey], y: unioun });
      }
    }
  }
  return candidates;
}

function findUnion(one: number[], two: number[]): number[] | null {
  const result = [];
  const oneSet = new Set(one);
  for (const num of two) {
    if (oneSet.has(num)) result.push(num);
  }

  if (result.length < 2) {
    return null;
  }

  return closestPair(result);
}

function closestPair(nums: number[]): [number, number] {
  // Step 1: Sort the array
  nums.sort((a, b) => a - b);

  // Step 2: Initialize with the first pair
  let minDiff = Infinity;
  let result: [number, number] = [nums[0], nums[1]];

  // Step 3: Scan adjacent elements
  for (let i = 1; i < nums.length; i++) {
    const diff = Math.abs(nums[i] - nums[i - 1]);

    if (diff < minDiff) {
      minDiff = diff;
      result = [nums[i - 1], nums[i]];
    }
  }

  return result;
}
