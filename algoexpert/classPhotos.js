const sortFn = (a, b) => a - b;

function classPhotos(redShirtHeights, blueShirtHeights) {
  const redSorted = redShirtHeights.sort(sortFn);
  const blueSorted = blueShirtHeights.sort(sortFn);
  const dir = redSorted[0] < blueSorted[0];
  for (let i = 0; i < redSorted.length; i++) {
    if (dir && redSorted[i] >= blueSorted[i]) {
      return false;
    }

    if (!dir && redSorted[i] <= blueSorted[i]) {
      return false;
    }
  }
  // Write your code here.
  return true;
}

// Do not edit the line below.
exports.classPhotos = classPhotos;
