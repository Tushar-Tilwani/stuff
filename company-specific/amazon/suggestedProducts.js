/**
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 */
var suggestedProducts = function (products, searchWord) {
  const sortedProducts = products.sort((a, b) => a.localeCompare(b));

  const result = [];
  const searchWordArr = searchWord.split("");

  let searchStr = "";
  for (const c of searchWordArr) {
    searchStr += c;
    const currIndex = result.length;
    result.push([]);
    for (const product of sortedProducts) {
      if (product.startsWith(searchStr)) {
        result[currIndex].push(product);
      }
      if (result[currIndex].length === 3) {
        break;
      }
    }
  }

  return result;
};
