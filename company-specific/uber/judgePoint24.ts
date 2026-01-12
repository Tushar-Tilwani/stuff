function evalWithFunction(expr: string): number {
  return Function(`"use strict"; return (${expr});`)() as number;
}

// console.log(evalWithFunction("(1+(1+6)+9)")); // 17

function judgePoint24(cards: number[]): boolean {
  const answer = [false];
  dfs(cards, [], 0, 0, answer);

  return answer[0];
}

function swap(arr: number[], i: number, j: number) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

const OPS = ["+", "-", "/", "*"];

function dfs(cards: number[], path: string[], index: number, paramCount: number, answer: boolean[]) {
  if (answer[0]) {
    return;
  }
  if (index === cards.length - 1) {
    path.push(`${cards[index]}`);
    if (paramCount === 0 && !answer[0]) answer[0] = eval(path.join("")) == 24;
    path.pop();

    path.push(`${cards[index]})`);
    if (paramCount === 1 && !answer[0]) answer[0] = eval(path.join("")) == 24;
    path.pop();
    return;
  }

  for (let i = index; i < cards.length; i++) {
    swap(cards, i, index);
    path.push(`(${cards[index]}`);
    for (const op of OPS) {
      path.push(op);
      dfs(cards, path, index + 1, paramCount + 1, answer);
      path.pop();
    }
    path.pop();

    if (paramCount > 0) {
      path.push(`${cards[index]})`);
      for (const op of OPS) {
        path.push(op);
        dfs(cards, path, index + 1, paramCount - 1, answer);
        path.pop();
      }
      path.pop();
    }

    path.push(`${cards[index]}`);
    for (const op of OPS) {
      path.push(op);
      dfs(cards, path, index + 1, paramCount, answer);
      path.pop();
    }
    path.pop();
    swap(cards, i, index);
  }
}
