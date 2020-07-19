//https://leetcode.com/problems/integer-to-english-words/

function one(num) {
  switch (num) {
    case 1:
      return "One";
    case 2:
      return "Two";
    case 3:
      return "Three";
    case 4:
      return "Four";
    case 5:
      return "Five";
    case 6:
      return "Six";
    case 7:
      return "Seven";
    case 8:
      return "Eight";
    case 9:
      return "Nine";
  }
  return "";
}

function twoLessThan20(num) {
  switch (num) {
    case 10:
      return "Ten";
    case 11:
      return "Eleven";
    case 12:
      return "Twelve";
    case 13:
      return "Thirteen";
    case 14:
      return "Fourteen";
    case 15:
      return "Fifteen";
    case 16:
      return "Sixteen";
    case 17:
      return "Seventeen";
    case 18:
      return "Eighteen";
    case 19:
      return "Nineteen";
  }
  return "";
}

function ten(num) {
  switch (num) {
    case 2:
      return "Twenty";
    case 3:
      return "Thirty";
    case 4:
      return "Forty";
    case 5:
      return "Fifty";
    case 6:
      return "Sixty";
    case 7:
      return "Seventy";
    case 8:
      return "Eighty";
    case 9:
      return "Ninety";
  }
  return "";
}

/**
 * @param {number} num
 * @return {string}
 */
var numberToWords = function(num) {
    
};
