/**
 * @param {number} n
 * @param {number} headID
 * @param {number[]} manager
 * @param {number[]} informTime
 * @return {number}
 */
var numOfMinutes = function(n, headID, manager, informTime) {
  const edgeList = new Map();

  for (let node = 0; node < manager.length; node++) {
    const nodeManger = manager[node];
    if (edgeList.has(nodeManger)) {
      edgeList.get(nodeManger).push(node);
    } else {
      edgeList.set(nodeManger, [node]);
    }
  }

  const result = [0];
  dfs(headID, edgeList, informTime, result);
  return result[0];
};

function dfs(node, edgeList, informTime, sum, result) {
  if (!edgeList.has(node)) {
    if (result[0] < sum) {
      result[0] = sum;
    }
    return;
  }

  for (const child of edgeList.get(node)) {
    dfs(child, edgeList, informTime, sum + informTime[node], result);
  }
}
