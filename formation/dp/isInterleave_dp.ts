function isInterleave(s1: string, s2: string, s3: string): boolean {
  const len1 = s1.length;
  const len2 = s2.length;
  if (len1 + len2 !== s3.length) {
    return false;
  }
  const TABLE = new Array(len1 + 1).fill(null).map(() => new Array(len2 + 1).fill(null));
  TABLE[0][0] = true;
  for (let i = 1; i <= len1; i++) {
    TABLE[i][0] = s1[i - 1] === s3[i - 1] && TABLE[i-1][0];
  }

  for (let j = 1; j <= len2; j++) {
    TABLE[0][j] = s2[j - 1] === s3[j - 1] && TABLE[0][j-1];
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
       
      if (s1[i - 1] === s3[i + j - 1] && s2[j - 1] === s3[i + j - 1]) {
        TABLE[i][j] = TABLE[i][j - 1] || TABLE[i - 1][j];
      } else if (s1[i - 1] === s3[i + j - 1]) {
        // this means we can use s1 character to interleave the string in s3
        // This means if TABLE[i-1][j] is true that means this true as well
        
        TABLE[i][j] = TABLE[i-1][j];
      } else if (s2[j - 1] === s3[i + j - 1]) {
        TABLE[i][j] = TABLE[i][j-1];
      } else {
        TABLE[i][j] = false;
      }
    // console.log([s1[i - 1], s2[j - 1], s3[i + j - 1], i, j, i + j - 1], TABLE[i][j])
    }
  }

//   console.log(TABLE);

  return TABLE[len1][len2];
}
