function isInterleave(s1: string, s2: string, s3: string): boolean {
  const len1 = s1.length;
  const len2 = s2.length;
  const len3 = s3.length;
  if (len1 + len2 !== len3) {
    return false;
  }
  const TABLE = Array.from({ length: len1 + 1 }, () =>
    Array.from({ length: len2 + 1 }, () => false)
  );
  TABLE[0][0] = true;
  for (let i = 1; i <= len1; i++) {
    TABLE[i][0] = TABLE[i - 1][0] && s1[i - 1] === s3[i - 1];
    if (!TABLE[i][0]) {
      break;
    }
  }

  for (let j = 1; j <= len2; j++) {
    TABLE[0][j] = TABLE[0][j - 1] && s2[j - 1] === s3[j - 1];
    if (!TABLE[0][j]) {
      break;
    }
  }
  // console.log({s1,s2,s3})

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      // console.log({i,j}, s1[i - 1] , s2[j - 1], s3[i + j - 1])
      if (TABLE[i - 1][j]) {
        TABLE[i][j] = s1[i - 1] === s3[i + j - 1];
      } else if (TABLE[i][j - 1]) {
        TABLE[i][j] = s2[j - 1] === s3[i + j - 1];
      }
    }
  }

  // console.log(TABLE);

  return TABLE[len1][len2];
}
