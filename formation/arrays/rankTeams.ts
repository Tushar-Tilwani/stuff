type Tuple = [string, number[]];
const sortFn = (a: Tuple, b: Tuple) => {
  const [teamA, rankArrayA] = a;
  const [teamB, rankArrayB] = b;
  for (let i = 0; i < rankArrayA.length; i++) {
    if (rankArrayA[i] !== rankArrayB[i]) {
      return rankArrayA[i] - rankArrayB[i];
    }
  }
  return teamA.localeCompare(teamB);
};

function rankTeams(votes: string[]): string {
  const rankMap = new Map<string, number[]>();
  for (const vote of votes) {
    let rank = 0;
    for (const team of vote) {
      const rankArray = rankMap.get(team) ?? new Array(26).fill(0);
      rankArray[rank] += 1;
      rankMap.set(team, rankArray);
      rank++;
    }
  }

  console.log(rankMap);

  return Array.from(rankMap.entries())
    .sort(sortFn)
    .map(([team]) => team)
    .join("");
}
