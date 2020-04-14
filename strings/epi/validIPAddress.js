function restoreIpAddresses(str) {
  const result = [];
  helper(str, 0, [], result);
  return result;
}

function helper(str, startIndex, path, result) {
  if (path.length > 4) {
    return result;
  }
  if (startIndex >= str.length && path.length === 4) {
    result.push(path.join("."));
    return result;
  }

  for (let i = startIndex + 1; i <= str.length; i++) {
    const subStr = str.slice(startIndex, i);
    if (
      (subStr.startsWith("0") && subStr.length > 1) ||
      parseInt(subStr) > 255
    ) {
      break;
    }
    path.push(subStr);
    helper(str, i, path, result);
    path.pop();
  }
  return result;
}

console.log(restoreIpAddresses("010010"));
