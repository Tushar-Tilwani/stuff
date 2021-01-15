/**
 * @param {number[]} hand
 * @param {number} W
 * @return {boolean}
 */
var isNStraightHand = function (hand, W) {
    let num = 0;
    const freqMap = hand.reduce((acc, val) => {
        acc.set(val, acc.get(val) + 1 || 1);
        return acc;
    }, new Map());

    const minHeap = new Heap((a, b) => a[0] < b[0]);


    for (const entry of freqMap.entries()) {
        minHeap.add(entry);
    }

    while (minHeap.peekTop()) {
        const spares = [];

        let prevVal = null;

        for (let i = 0; i < W; i++) {
            if (!minHeap.peekTop()) {
                return false;
            }
            const [val, freq] = minHeap.extractTop();
            if (prevVal !== null && prevVal + 1 !== val) {
                return false;
            }
            prevVal = val;
            console.log(val, freq);

            if (freq > 1) {
                spares.push([val, freq - 1]);
            }
        }

        for (const spare of spares) {
            minHeap.add(spare);
        }

        num++;

    }
    return num === W;
};

function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

class Heap {
    constructor(comparator) {
        this.arr = [null];
        this.comparator = comparator || ((a, b) => a < b);
    }

    add(val) {
        this.arr.push(val);
        this.bubbleUp();
    }

    bubbleUp() {
        let childIndex = this.arr.length - 1;
        let parentIndex;
        while (true) {
            parentIndex = Math.floor(childIndex / 2);
            if (
                parentIndex < 1 ||
                this.comparator(this.arr[parentIndex], this.arr[childIndex])
            ) {
                break;
            }

            swap(this.arr, childIndex, parentIndex);
            childIndex = parentIndex;
        }
    }

    bubbleDown() {
        swap(this.arr, 1, this.arr.length - 1);
        this.arr.pop();

        const len = this.arr.length;
        let parentIndex = 1;

        while (true) {
            const childIndex1 = 2 * parentIndex;
            const childIndex2 = 2 * parentIndex + 1;
            let childIndex;
            if (childIndex1 >= len) {
                // If parent does not have any child
                break;
            }
            if (childIndex2 < len) {
                // If parent has both children
                childIndex = this.comparator(
                    this.arr[childIndex1],
                    this.arr[childIndex2]
                )
                    ? childIndex1
                    : childIndex2;
            } else {
                // If parent has one children
                childIndex = childIndex1;
            }

            // Parent is in the right position
            if (this.comparator(this.arr[parentIndex], this.arr[childIndex])) {
                break;
            }

            // If parent is larger than child. Means we need to swap.
            swap(this.arr, parentIndex, childIndex);

            parentIndex = childIndex;
        }
    }

    extractTop() {
        if (this.arr.length === 1) {
            return null;
        }

        // Remove top element
        const min = this.arr[1];

        this.bubbleDown();

        return min;
    }

    peekTop() {
        if (this.arr.length === 1) {
            return null;
        }

        // Remove top element
        return this.arr[1];
    }
}





let hand = [1, 2, 3, 6, 2, 3, 4, 7, 8], W = 3;


console.log(isNStraightHand(hand, W));