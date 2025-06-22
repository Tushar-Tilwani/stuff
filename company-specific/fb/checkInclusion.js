/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
  const originalS1Map = s1.split("").reduce((map, char) => {
    map.set(char, (map.get(char) ?? 0) + 1);
    return map;
  }, new Map());

  let foundSum = s1.length;
  let mapCheck = new Map(originalS1Map);
  let firstFoundIndex = null;
  let i = 0;
  while (i < s2.length) {
    // console.log(i, s2[i]);
    if (mapCheck.has(s2[i])) {
      if (firstFoundIndex === null) {
        firstFoundIndex = i;
      }

      foundSum--;
      const charSum = mapCheck.get(s2[i]) - 1;
      mapCheck.set(s2[i], charSum);
      //   console.log(mapCheck);
      if (foundSum === 0 && charSum === 0) {
        return true;
      }
      if (charSum < 0) {
        foundSum = s1.length;
        mapCheck = new Map(originalS1Map);
        i = firstFoundIndex + 1;
        firstFoundIndex = null;
      } else {
        i++;
      }
      continue;
    }
    firstFoundIndex = null;

    if (foundSum < s1.length) {
      foundSum = s1.length;
      mapCheck = new Map(originalS1Map);
    }
    i++;
  }

  return false;
};

console.log(checkInclusion("adc", "dcda"));
// console.log(checkInclusion("abc", "bbbca"));
