function get_distinct_subsets(str) {
  const result = [];
  helper(str.split("").sort(), 0, [], result, null);
  return result;
}

function helper(strArr, index, slate, result, exclude) {
  // Skip seens items
  if (index === strArr.length) {
    result.push(slate.join(""));
    return;
  }

  helper(strArr, index + 1, slate, result, strArr[index]);

  if (strArr[index] === exclude) {
    return;
  }
  slate.push(strArr[index]);
  helper(strArr, index + 1, slate, result, null);
  slate.pop();
}

console.log(get_distinct_subsets("aba"));
