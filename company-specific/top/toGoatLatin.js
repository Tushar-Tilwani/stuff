/**
 * @param {string} sentence
 * @return {string}
 */
const VOWEL_SET = new Set(["a", "e", "i", "o", "u"]);
var toGoatLatin = function (sentence) {
  const words = sentence.split(" ");
  const result = [];
  const suffix = ["m", "a"];
  for (let i = 0; i < words.length; i++) {
    suffix.push("a");
    const word = words[i];
    if (VOWEL_SET.has(word[0].toLocaleLowerCase())) {
      result.push(word + suffix.join(""));
    } else {
      result.push(word.slice(1) + word[0] + suffix.join(""));
    }
  }
  return result.join(" ");
};
