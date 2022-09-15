/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 */
var Solution = function (head) {
  const listMap = new Map();
  let node = head;
  let index = 0;
  while (node) {
    listMap.set(index, node);
    index++;
    node = node.next;
  }
  this.listMap = listMap;
  this.length = index;
};

/**
 * @return {number}
 */
Solution.prototype.getRandom = function () {
  return this.listMap.get(getRandomInRange(0, this.length)).val;
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(head)
 * var param_1 = obj.getRandom()
 */

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
