/*
 * Complete the mergeArrays function below.
 */
function mergeArrays(arr) {
    const isAcs = isAscending(arr);
    return arr.reduce(
      (acc, singleArr) => {
          acc = mergeTwoArray(acc, singleArr, isAcs);
          return acc;
      },
      []
    );
  }
  
  function mergeTwoArray(arr1, arr2, isAcs) {
    let i = 0;
    let j = 0;
    const len1 = arr1.length;
    const len2 = arr2.length;
    const result = [];
  
    while (i < len1 && j < len2) {
      if (compare(arr1[i], arr2[j], isAcs)) {
        result.push(arr1[i]);
        i++;
      } else {
        result.push(arr2[j]);
        j++;
      }
    }
  
    while (i < len1) {
      result.push(arr1[i]);
      i++;
    }
  
    while (j < len2) {
      result.push(arr2[j]);
      j++;
    }
  
    return result;
  }
  
  function compare(i, j, isAsc) {
    if (isAsc) {
      return i <= j;
    }
    return i >= j;
  }
  
  function isAscending(arr) {
    for (let i = 0; i < arr.length; i++) {
      const singleArr = arr[i];
      if (singleArr.length < 2) {
        continue;
      }
      for (let j = 0; j < singleArr.length; j++) {
        if (singleArr[j] === singleArr[j + 1]) {
          continue;
        }
        return singleArr[j] < singleArr[j + 1];
      }
    }
    return true;
  }
  