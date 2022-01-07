/**
 * @param {string[]} source
 * @return {string[]}
 */

function removeComments(source) {
  const lines = [];
  let lineIgnore = false;
  let blockIgnore = false;

  for (let i = 0; i < source.length; i++) {
    if (!blockIgnore) {
      lines.push([]);
    }
    const endLineIndex = lines.length - 1;
    for (let j = 0; j < source[i].length; j++) {
      lineIgnore = lineIgnore || isLineComment(source[i][j], source[i][j + 1]);

      blockIgnore =
        blockIgnore || isBlockComment(source[i][j], source[i][j + 1]);

      if (isBlockEnd(source[i][j], source[i][j + 1])) {
        blockIgnore = false;
        j++;
        continue;
      }

      if (lineIgnore || blockIgnore) {
        continue;
      }
      lines[endLineIndex].push(source[i][j]);
    }
    lineIgnore = false;
  }

  return lines.map(line => line.join("")).filter(line => !!line);
}

function isLineComment(char1, char2) {
  return char1 === "/" && char2 === "/";
}

function isBlockComment(char1, char2) {
  return char1 === "/" && char2 === "*";
}

function isBlockEnd(char1, char2) {
  return char1 === "*" && char2 === "/";
}

//["/*Test program */", "int main()", "{ ", "  // variable declaration ", "int a, b, c;", "/* This is a test", "   multiline  ", "   comment for ", "   testing */", "a = b + c;", "}"]
