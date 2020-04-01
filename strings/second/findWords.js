/*
 * Complete the 'find_words' function below.
 *
 * The function accepts STRING and STRING ARRAY as parameter.
 * Return 2D INTEGER ARRAY.
 */
function find_words(text, words) {
  const textArr = text.split(" ");
  const textMap = {};
  let index = 0;
  for (const textWord of textArr) {
    if (textMap[textWord]) {
      textMap[textWord].push(index);
    } else {
      textMap[textWord] = [index];
    }
    index += textWord.length + 1;
  }

  const result = [];
  for (const word of words) {
    result.push(textMap[word] || [-1]);
  }

  return result;
}

console.log(
  find_words("you are very very smart", ["you", "are", "very", "handsome"])
);

// /*
//  * Complete the 'find_words' function below.
//  *
//  * The function accepts STRING and STRING ARRAY as parameter.
//  * Return 2D INTEGER ARRAY.
//  */
// function find_words(text, words) {
//   const hash_map = {};
//   const split_words = text.split(" ");
//   let start = 0;

//   for (let word of split_words) {
//     if (hash_map[word]) {
//       hash_map[word].push(start);
//     } else {
//       hash_map[word] = [start];
//     }

//     start += word.length + 1;
//   }

//   const result = [];
//   for (let word of words) {
//     result.push(hash_map[word] || [-1]);
//   }

//   return result;
// }
