const FACTOR = 10 ** 3;

const TOLERANCE = 1 / FACTOR;

const getSqrt = (x) => {
  let start = 0;
  let end = Math.ceil(x);

  while (start <= end) {
    const mid = (end - start) / 2 + start;
    const midVal = mid * mid;
    if (Math.abs(midVal - x) < TOLERANCE) {
      return formatNumber(mid);
    }

    if (midVal < x) {
      start = mid;
    } else {
      end = mid;
    }
  }

  return null;
};

function formatNumber(val) {
  return Math.round(val * FACTOR) / FACTOR;
}

console.log(getSqrt(0.25), getSqrt(4), getSqrt(16), getSqrt(9));
