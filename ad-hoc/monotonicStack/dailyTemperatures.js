/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
    const STACK = [];
    const result = [];
    for (let i = temperatures.length - 1; i >= 0; i--) {
        const temperature = temperatures[i];
        while (STACK.length > 0 && STACK[STACK.length - 1][0] <= temperature) {
            STACK.pop();
        }

        if (STACK.length === 0) {
            result.push(0);
        } else {
            result.push(STACK[STACK.length - 1][1] - i);
        }

        STACK.push([temperature, i]);
    }

    return result.reverse();

};