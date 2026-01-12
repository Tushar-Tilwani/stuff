var Leaderboard = function () {
  this.playerMap = new Map();
};

/**
 * @param {number} playerId
 * @param {number} score
 * @return {void}
 */
Leaderboard.prototype.addScore = function (playerId, score) {
  this.playerMap.set(playerId, (this.playerMap.get(playerId) ?? 0) + score);
};

/**
 * @param {number} K
 * @return {number}
 */
Leaderboard.prototype.top = function (K) {
  const values = Array.from(this.playerMap.values()).sort((a, b) => b - a) ?? [];
  return values.slice(0, K).reduce((acc, score) => acc + score, 0);
};

/**
 * @param {number} playerId
 * @return {void}
 */
Leaderboard.prototype.reset = function (playerId) {
  this.playerMap.delete(playerId);
};

/**
 * Your Leaderboard object will be instantiated and called as such:
 * var obj = new Leaderboard()
 * obj.addScore(playerId,score)
 * var param_2 = obj.top(K)
 * obj.reset(playerId)
 */
