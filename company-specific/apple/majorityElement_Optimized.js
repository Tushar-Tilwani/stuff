/**
 *  Boyer-Moore Voting Algorithm depends on the fact one element
 * is more than n/2 times. If you keep a counter to add/substract based on
 * value. In the end you'll be left with a positive counter for the majority element.
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  let result = null;
  let count = 0;

  for (const num of nums) {
    if (count === 0) {
      result = num;
      count = 1;
      continue;
    }
    count += result === num ? 1 : -1;
  }
  return result;
};
