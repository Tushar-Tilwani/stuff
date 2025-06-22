const getRand = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

function shuffle(n) {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(i + 1);
  }

  for (let i = 0; i < n; i++) {
    const randIndex = getRand(0, n - i - 1);
    swap(result, randIndex, n - i - 1);
  }
  return result;
}

const freqMap = new Map();
for (let i = 0; i <= 100000; i++) {
  const result = shuffle(2).join("");
  freqMap.set(result, freqMap.get(result) + 1 || 1);
}

console.log(freqMap);
