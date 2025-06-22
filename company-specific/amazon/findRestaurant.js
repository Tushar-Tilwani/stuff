/**
 * @param {string[]} list1
 * @param {string[]} list2
 * @return {string[]}
 */
var findRestaurant = function (list1, list2) {
  const result = new Map();
  for (let i = 0; i < list1.length; i++) {
    for (let j = 0; j < list2.length; j++) {
      if (list1[i] === list2[j]) {
        const pos = i + j;
        if (!result.has(pos)) {
          result.set(pos, []);
        }
        result.get(pos).push(list1[i]);
      }
    }
  }
  const positions = Array.from(result.keys());
  positions.sort((a, b) => a - b);
  console.log(positions);
  return result[positions[0]];
};
