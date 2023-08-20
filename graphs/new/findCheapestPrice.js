/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function (n, flights, src, dst, k) {
    const TABLE = new Array(n).fill().map(() => new Array(k + 1).fill(Infinity));
    const edgeList = flights.reduce((acc, [src, dst, w]) => {
        if (!acc.has(src)) {
            acc.set(src, []);
        }
        acc.get(src).push([dst, w]);
        return acc;
    }, new Map());
    TABLE[src][0] = 0;

    for (let j = 1; j <= k; j++) {
        for (let node = 0; node < n; node++) {
            const distSoFar = TABLE[node][j - 1];
            if (!Number.isFinite(distSoFar)) {
                continue;
            }
            const neighbors = edgeList.get(node);
            for (const [nNode, nDist] of neighbors) {
                TABLE[nNode][j] = Math.min(TABLE[nNode][j], nDist + distSoFar);
            }
        }
    }
    console.log(TABLE);

    return TABLE[dst][k + 1];


};