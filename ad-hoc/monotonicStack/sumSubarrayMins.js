/**
 * @param {number[]} arr
 * @return {number}
 */
var sumSubarrayMins = function (arr) {
    const STACK = [[-Infinity, -1]];
    const CACHE = [];
    let result = 0;
    for (let i = 0; i < arr.length; i++) {
        const num = arr[i];

        while (STACK.length > 1 && STACK[STACK.length - 1][0] >= num) {
            STACK.pop();
        }
        const minIndex = STACK[STACK.length - 1][1];

        const curr = (i - minIndex) * num + (CACHE[i - 1] ?? 0);

        if (num < STACK[STACK.length - 1][0]) {
            STACK.push([num, i]);
        }

        CACHE[i] = curr;
    }

    console.log(CACHE);

    return CACHE[arr.length - 1];

};