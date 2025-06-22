/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
    const result = new Map();
    const STACK = [];
    for (let i = nums2.length - 1; i >= 0; i--) {
        const num = nums2[i];
        while (STACK.length > 0 && STACK[STACK.length - 1][0] >= num) {
            STACK.pop();
        }
        result.set(num, STACK.length > 0 ? STACK[STACK.length - 1][0] : -1);
        STACK.push([num, i]);
    }

    return nums1.map(num => result.get(num));

};