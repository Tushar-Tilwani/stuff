function arrayOfProducts(array) {
  // Write your code here.
  const leftArray = [];
  const rightArray = [];
  const len = array.length - 1;

  let product = 1;
  for (let i = 0; i <= len; i++) {
    product = product * (array[i - 1] ?? 1);
    leftArray[i] = product;
  }

  product = 1;
  for (let i = len; i >= 0; i--) {
    product = product * (array[i + 1] ?? 1);
    rightArray[i] = product;
  }

//   console.log(leftArray, rightArray);

  return leftArray.map((v, i) => v * rightArray[i]);
}

// Do not edit the line below.
exports.arrayOfProducts = arrayOfProducts;

console.log(arrayOfProducts([5, 1, 4, 2]));
