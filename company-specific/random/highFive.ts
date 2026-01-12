function highFive(items: number[][]): number[][] {
  const scoreMap = items.reduce((acc, [id, score]) => {
    const scores = acc.get(id) ?? [];
    scores.push(score);
    acc.set(id, scores);
    return acc;
  }, new Map<number, number[]>());
  const answer: number[][] = [];
  for (const [id, scores] of scoreMap.entries()) {
    const sum = scores
      .sort((a, b) => b - a)
      .slice(0, 5)
      .reduce((acc, v) => acc + v, 0);
    answer.push([id, Math.floor(sum / 5)]);
  }
  return answer.sort((a, b) => b[1] - a[1]);
}
