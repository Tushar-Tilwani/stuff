// https://formation.dev/platform/task/01d24900-91d7-11f0-9fd5-b77327fc7af2

function combinationSum4(arr, target) {
  const TABLE = new Array(target + 1).fill(0);
  TABLE[0] = 1;
  for (let i = 0; i <= target; i++) {
    for (let j = 0; j < arr.length; j++) {
      const pTarget = i - arr[j];
      if (pTarget >= 0) {
        TABLE[i] += TABLE[pTarget];
      }
    }
  }
  return TABLE[target]
}

// function helper(arr, target, cache = new Map()) {
//   if (target === 0) {
//     return 1;
//   }
//   if (target < 0) {
//     return 0;
//   }
//   if (cache.has(target)) {
//     return cache.get(target);
//   }

//   let count = 0;
//   for (let i = 0; i < arr.length; i++) {
//     count += helper(arr, target - arr[i]);
//   }
//   cache.set(target, count);
//   return count;
// }

console.log(combinationSum4([2, 1], 10));
