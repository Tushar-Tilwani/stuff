/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var verticalTraversal = function (root) {
  const map = new Map();

  const sortFn = ({ Y: Y1, val: val1 }, { Y: Y2, val: val2 }) => {
    if (Y1 === Y2) {
      return val1 - val2;
    }
    return Y1 - Y2;
  };

  const mapFn = ({ Y, val }) => val;

  dfs(root, 0, 0, map);
  console.log(map);
  const result = [];
  const keys = Array.from(map.keys())
    .map((key) => parseInt(key))
    .sort((a, b) => a - b);

  for (const key of keys) {
    const values = map.get(key);
    result.push(values.sort(sortFn).map(mapFn));
  }
  return result;
};

function dfs(node, X, Y, map) {
  if (!node.left && !node.right) {
    setInMap(map, X, Y, node.val);
    return;
  }

  if (node.left) {
    dfs(node.left, X - 1, Y + 1, map);
  }

  setInMap(map, X, Y, node.val);

  if (node.right) {
    dfs(node.right, X + 1, Y + 1, map);
  }
}

function setInMap(map, X, Y, val) {
  if (!map.has(X)) {
    map.set(X, [{ Y, val }]);
    return;
  }

  map.get(X).push({ Y, val });
}
