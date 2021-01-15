/**
 * @param {string} characters
 * @param {number} combinationLength
 */
var CombinationIterator = function (characters, combinationLength) {
  const chars = Array.from(new Set(characters.split("")).values()).sort(
    (a, b) => a.charCodeAt(0) - b.charCodeAt(0)
  );

  const result = [];
  dfs(chars, 0, combinationLength, [], result);
  console.log(result);

  this.result = result;
  this.index = -1;
};

/**
 * @return {string}
 */
CombinationIterator.prototype.next = function () {
  if (this.index === this.result.length - 1) {
    return;
  }
  this.index++;
  return this.result[this.index];
};

/**
 * @return {boolean}
 */
CombinationIterator.prototype.hasNext = function () {
  return this.index < this.result.length;
};

/**
 * Your CombinationIterator object will be instantiated and called as such:
 * var obj = new CombinationIterator(characters, combinationLength)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */

function dfs(characters, index, combinationLength, path, result) {
  if (index === characters.length) {
    if (path.length === combinationLength) {
      result.push(path.join(""));
    }
    return;
  }

  path.push(characters[index]);
  dfs(characters, index + 1, combinationLength, path, result);
  path.pop();

  dfs(characters, index + 1, combinationLength, path, result);
}
