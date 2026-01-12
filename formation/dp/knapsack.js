// 0/1 Knapsack — Bottom-Up DP
// values[i]  = value of item i
// weights[i] = weight of item i
// limit      = knapsack capacity
//
// TABLE dimensions: (len + 1) x (limit + 1)
//   TABLE[i][j] = maximum value achievable using the first i items
//                 with capacity exactly j (i.e., capacity budget ≤ j).
//
// Recurrence:
//   Let w = weights[i-1], v = values[i-1] for the i-th item (1-indexed row).
//   If w > j: TABLE[i][j] = TABLE[i-1][j]                   // can't take item i
//   Else:     TABLE[i][j] = max(
//                              TABLE[i-1][j],                // skip item i
//                              TABLE[i-1][j - w] + v         // take item i
//                            )
//
// Initialization:
//   Row 0 (i = 0) is 0 for all j: with 0 items, best value is 0.
//   Col 0 (j = 0) is 0 for all i: with 0 capacity, best value is 0.
//
// Time:  O(len * limit)
// Space: O(len * limit)

function knapsack(values, weights, limit) {
  const len = values.length;

  // TABLE[i][j] as described above; fill with 0 so base cases are set.
  const TABLE = new Array(len + 1).fill(null).map(() => new Array(limit + 1).fill(0));

  for (let i = 1; i <= values.length; i++) {
    for (let j = 1; j <= limit; j++) {
      // Option 1: skip the current item (i-th item in 1-based row uses index i-1 in arrays)
      const didNotChoose = TABLE[i - 1][j];

      // Remaining capacity if we *do* take this item
      const updatedLimitWithChoosing = j - weights[i - 1];
      const isLimitValid = updatedLimitWithChoosing >= 0;

      // Option 2: take the current item, only if it fits.
      // Add its value to the best we could do with the remaining capacity
      // using only the first (i-1) items.
      const choosedValue = isLimitValid
        ? TABLE[i - 1][updatedLimitWithChoosing] + values[i - 1]
        : -Infinity; // if it doesn't fit, make this option non-competitive

      // Best of taking vs skipping
      TABLE[i][j] = Math.max(didNotChoose, choosedValue);
    }
  }

  // Answer: using all items (len) and full capacity (limit)
  return TABLE[len][limit];
}
