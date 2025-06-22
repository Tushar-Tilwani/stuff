                                                                                                                                    /**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
const searchMatrix = function (matrix, target) {
    let start = 0;
    let end = matrix.length - 1;
  
  // Row binary search
    while (start <= end) {
      const mid = Math.floor((end - start) / 2) + start;
      if (matrix[mid][0] === target) {
        return true;
      }
  
      if (target < matrix[mid][0]) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }
  
    const row = end;
  
  // If target is lower than the minimum value in the set
    if(row === -1){
        return false;
    }
  
    start = 0;
    end = matrix[row].length - 1;
  
  // Binary search row
    while (start <= end) {
      const mid = Math.floor((end - start) / 2) + start;
      if (matrix[row][mid] === target) {
        return true;
      }
  
      if (target < matrix[row][mid]) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }
  
    return false;
  };
  