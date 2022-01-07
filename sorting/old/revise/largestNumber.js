const maxDigits = num => Math.floor(Math.log10(num));

/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumberHelper = function(nums, d = 0) {
  if (maxDigits(Math.max(...nums)) < d) {
    return nums;
  }

  const COUNTING_BUCKET = new Array(10).fill(null).map(() => []);
  for (const num of nums) {
    let digit = maxDigits(num) - d;
    digit = digit > 0 ? digit : 0;
    const place = Math.floor(num / Math.pow(10, digit)) % 10;
    COUNTING_BUCKET[place].push(num);
  }

  let j = 0;
  for (let k = 9; k >= 0; k--) {
    const subNums = COUNTING_BUCKET[k];

    if (subNums.length > 1) {
      largestNumberHelper(subNums, d + 1);
    }

    while (subNums.length > 0) {
      nums[j] = subNums.shift();
      j++;
    }
  }

  return nums;
};

function largestNumber(nums) {
  return (
    largestNumberHelper(nums, 0)
      .join("")
      .replace(/^0+/, "") || "0"
  );
}

const largestNumber = nums =>
  nums
    .map(n => `${n}`)
    .sort((a, b) => {
      return `${b}${a}`.localeCompare(`${a}${b}`);
    })
    .join("")
    .replace(/^0+/, "") || "0";
console.log(largestNumber([824, 8247]));
// console.log(largestNumber([0, 0, 0], 1));
