const numOfMaxDigits1 = (num, base = 10) => {
  let len = 0;
  while (num > 0) {
    num = Math.floor(num / base);
    len++;
  }
  return len;
};

const numOfMaxDigits = num => Math.floor(Math.log10(num));

const getBucket = base => {
  const bucket = [];
  for (let i = 0; i < base; i++) {
    bucket.push([]);
  }
  return bucket;
};

function radixSort(arr) {
  const BASE = 10;
  const COUNTING_BUCKET = getBucket(BASE);
  const MAX_DIGITS = numOfMaxDigits(Math.max(...arr), BASE);

  for (let i = 0; i < MAX_DIGITS; i++) {
    for (const value of arr) {
      let truncatedValue = Math.floor(value / Math.pow(BASE, i));
      let place = truncatedValue % BASE;
      COUNTING_BUCKET[place].push(value);
    }

    let j = 0;
    for (let k = 0; k < 10; k++) {
      while (COUNTING_BUCKET[k].length > 0) {
        arr[j] = COUNTING_BUCKET[k].shift();
        j++;
      }
    }
  }

  return arr;
}

function radixSort1(arr) {
  const BASE = 10;
  const COUNTING_BUCKET = getBucket(BASE);
  let i = 0;

  while (true) {
    for (const value of arr) {
      let truncatedValue = Math.floor(value / Math.pow(BASE, i));
      let place = truncatedValue % BASE;
      COUNTING_BUCKET[place].push(value);
    }

    if (COUNTING_BUCKET[0].length === arr.length) {
      // If all elements are in 0 now. That means we have reached the end
      break;
    }

    let j = 0;
    for (let k = 0; k < 10; k++) {
      while (COUNTING_BUCKET[k].length > 0) {
        arr[j] = COUNTING_BUCKET[k].shift();
        j++;
      }
    }
    i++;
  }

  return arr;
}

console.log(radixSort([5, 2000, 30001, 8, 1, 10762387647832, 0]));
