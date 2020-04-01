/*
 * Complete the function below.
 */
/*
For your reference:
LinkedListNode {
    var val;
    var next;
};
*/
function find_middle_node(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next && fast.next.next;
  }

  return slow;
}
