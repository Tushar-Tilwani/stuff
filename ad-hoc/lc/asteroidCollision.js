/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
var asteroidCollision = function (asteroids) {
    const STACK = [];
    for (let i = 0; i < asteroids.length; i++) {
        const curr = asteroids[i];
        const currAbs = Math.abs(curr);
        let lastValue = STACK[STACK.length - 1];
        let lastValueAbs = Math.abs(lastValue);
        if (curr < 0) {
            // move left;
            while (lastValue > 0 && STACK.length > 0 && lastValueAbs < currAbs) {
                STACK.pop();
                lastValue = STACK[STACK.length - 1];
                lastValueAbs = Math.abs(lastValue);
            }
            if (lastValueAbs === currAbs && lastValue > 0) {
                STACK.pop();
                continue;
            }

            if (lastValueAbs > currAbs && lastValue > 0) {
                continue;
            }

        }
        STACK.push(curr);


    }

    return STACK;

};