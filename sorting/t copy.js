function dutch_flag_sort(balls) {
  const total = balls.length;
  // R G B
  let rp = -1;
  let gp = -1;
  let bp = 0;

  while (bp < total) {
    if (balls[bp] === "R") {
      gp++;
      rp++;
      swap(balls, bp, gp);

      swap(balls, gp, rp);
    } else if (balls[bp] === "G") {
      gp++;
      swap(balls, bp, gp);
    }
    bp++;
  }
  return balls;
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}


console.log(dutch_flag_sort(['B', 'B','R', 'B','B', 'R', 'G']));