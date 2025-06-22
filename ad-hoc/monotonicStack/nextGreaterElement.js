/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
    const indexMap = nums1.reduce((acc, val, index) => {
        acc.set(val, index);
        return acc;
    }, new Map());
    const result = [];
    const STACK = [];
    for (let i = nums2.length - 1; i >= 0; i--) {
        const num = nums2[i];
        while (STACK.length > 0 && STACK[STACK.length - 1][0] >= num) {
            STACK.pop();
        }
        if (indexMap.has(num)) {
            result[indexMap.get(num)] = STACK.length > 0 ? STACK[STACK.length - 1][0] : -1;
        }
        STACK.push([num, i]);
    }

};