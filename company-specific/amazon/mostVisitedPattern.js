/**
 * @param {string[]} username
 * @param {number[]} timestamp
 * @param {string[]} website
 * @return {string[]}
 */
var mostVisitedPattern = function (username, timestamp, website) {
  const userMap = new Map();
  for (let i = 0; i < username.length; i++) {
    if (!userMap.has(username[i])) {
      userMap.set(username[i], []);
    }
    userMap.get(username[i]).push([website[i], timestamp[i]]);
  }

  for (const user of userMap.keys()) {
    userMap.get(user).sort((a, b) => a[1] - b[1]);
  }

  const webCountMap = new Map();

  for (const user of userMap.keys()) {
    const userWebsites = userMap.get(user).map((a) => a[0]);
    const keys = Array.from(
      getAllKeys(userWebsites, 0, [], new Set()).values()
    );
    // console.log(userWebsites, keys);
    for (const webKey of keys) {
      webCountMap.set(webKey, (webCountMap.get(webKey) ?? 0) + 1);
    }
  }

  const entires = Array.from(webCountMap.entries()).sort((a, b) => {
    if (b[1] === a[1]) {
      return a[0].localeCompare(b[0]);
    }
    return b[1] - a[1];
  });

  //   console.log(webCountMap, entires);

  return entires[0][0].split(",");
};

function getAllKeys(websites, index, path, result) {
  if (path.length === 3) {
    result.add(path.join());
    return result;
  }
  if (index === websites.length) {
    return result;
  }
  path.push(websites[index]);
  getAllKeys(websites, index + 1, path, result);
  path.pop();

  getAllKeys(websites, index + 1, path, result);

  return result;
}
