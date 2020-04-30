//Exercise - extend the functionality of a built in object

//#1
//Date object => to have new method .lastYear() which shows you last year 'YYYY' format.

Date.prototype.lastYear = function() {
  return Date.prototype.getFullYear.call(this) - 1;
};

console.log(new Date("1900-10-10").lastYear());
//'1899'

const map = Array.prototype.map;
Array.prototype.map = function(fn) {
  if (!fn) {
    return map.call(this, i => `${i}🗺`);
  }
  return map.call(this, fn);
};
//#Bonus
// Mofify .map() to print '🗺' at the end of each item.
console.log([1, 2, 3].map());
//1🗺, 2🗺, 3🗺

