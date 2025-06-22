/*
 * Complete the max_product_from_cut_pieces function below.
 */
function max_product_from_cut_pieces(n) {
  /*
   * Write your code here.
   */
  const DPTable = [];

  for (let i = 0; i <= n; i++) {
    DPTable[i] = [];
    for (let j = 0; j <= n - 1; j++) {
      DPTable[i][j].push(1);
    }
  }

  for (let i = 0; i <= n; i++) {

  }

  return DPTable[n];
}
