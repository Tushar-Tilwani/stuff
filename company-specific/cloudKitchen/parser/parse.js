// https://leetcode.com/discuss/interview-question/1901648/Cloud-KitchenCity-storage-system-or-Phone-Interview-or-System-design-question

const inputString = `
4
DISH
Spaghetti
10.95
2
3

1
CATEGORY
Pasta
4
5

2
OPTION
Meatballs
1.00

3
OPTION
Chicken
2.00

5
DISH
Lasagna
12.00

6
DISH
Caesar Salad
9.75
3`;

function getLines() {
  return inputString
    .trim()
    .split("\n\n")
    .map((a) => a.split("\n"));
}

exports.getLines = getLines;
