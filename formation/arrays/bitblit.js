function bitblit(buffer, srcx, srcy, destx, desty, width, height) {
  const finalWidth = Math.min(buffer[0].length, destx + width) - destx;
  const finalHeight = Math.min(buffer.length, desty + height) - desty;

  for (let i = finalHeight - 1; i >= 0; i--) {
    for (let j = finalWidth - 1; j >= 0; j--) {
      buffer[desty + i][destx + j] = buffer[srcy + i][srcx + j];
    }
  }

  return buffer;
}

const buffer1 = [
  ["*", "*", "|", "|"],
  ["*", "*", "|", "|"],
  ["-", "-", "/", "/"],
  ["-", "-", "/", "/"],
];

console.log(bitblit(buffer1, 0, 0, 2, 2, 3, 3));
