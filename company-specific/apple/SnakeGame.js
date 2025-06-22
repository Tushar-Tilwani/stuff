/**
 * @param {number} width
 * @param {number} height
 * @param {number[][]} food
 */
var SnakeGame = function (width, height, food) {
  this.width = width;
  this.height = height;
  this.head = [0, 0];
  this.size = 1;
  this.foodIndex = 0;
  this.food = food;
  this.moves = [];
  this.moves.push(this.head.join());
};

SnakeGame.prototype._addNewFood = function () {
  if (this.foodIndex >= this.food.length) {
    return;
  }
  const [fR, fC] = this.food[this.foodIndex];
  this.board[fR][fC] = 1;
  this.foodIndex += 1;
};
//["R"], ["D"], ["R"], ["U"], ["L"], ["U"]
/**
 * @param {string} direction
 * @return {number}
 */
SnakeGame.prototype.move = function (direction) {
  const { head } = this;
  switch (direction) {
    case "R":
      head[1] += 1;
      break;
    case "D":
      head[0] += 1;
      break;
    case "L":
      head[1] -= 1;
      break;
    case "U":
      head[0] -= 1;
    default:
      break;
  }

  const [hR, hC] = head;
  if (hC < 0 || hC >= this.width || hR < 0 || hR >= this.height) {
    return -1;
  }
  this.moves.push(head.join());
  const [fR, fC] = this.food[this.foodIndex] ?? [-1, -1];
  if (hR === fR && hC === fC) {
    this.size += 1;
    this.foodIndex += 1;
  }

  if (this.moves.length > this.size) {
    this.moves.shift();
  }
  //     console.log('head', head);
  // console.log(this.moves)
  // // has duplicates
  if (this.moves.length > new Set(this.moves).size) {
    return -1;
  }

  return this.size - 1;
};

/**
 * Your SnakeGame object will be instantiated and called as such:
 * var obj = new SnakeGame(width, height, food)
 * var param_1 = obj.move(direction)
 */
