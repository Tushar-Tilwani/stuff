/**
 * Decode Ways II (supports '*' wildcard).
 *
 * Key facts:
 * - A single '*' can be any digit from '1' to '9' → 9 possibilities.
 * - Two '*' together ("**") can produce:
 *     '11'..'19'  → 9 possibilities
 *     '21'..'26'  → 6 possibilities
 *   Total = 9 + 6 = 15 possibilities.
 * - Valid two-digit decodes are 10..26 inclusive.
 *
 * DP relation:
 *   ways[i] = ways[i-1] * waysForSingle(s[i-1])      // take last 1 char
 *           + ways[i-2] * waysForPair(s[i-2..i-1])   // take last 2 chars
 * …all modulo MOD.
 */

// ---------- Constants to avoid "magic numbers" ----------
const MOD = 1_000_000_007; // standard 1e9+7 modulus used to keep results in range
const ZERO_CHAR = "0";
const STAR_CHAR = "*";

const SINGLE_STAR_CHOICES = 9; // '*' → digits '1'..'9'
const DOUBLE_STAR_CHOICES = 15; // '**' → 11..19 (9) + 21..26 (6) = 15 total

const TWO_DIGIT_MIN = 10; // smallest valid 2-digit decode
const TWO_DIGIT_MAX = 26; // largest valid 2-digit decode

/**
 * Count ways a single character can be decoded.
 * - '0' alone cannot be decoded → 0
 * - '*' can be '1'..'9'          → 9
 * - '1'..'9'                      → 1
 */
function waysForSingle(char: string): number {
  if (char === ZERO_CHAR) return 0;
  if (char === STAR_CHAR) return SINGLE_STAR_CHOICES;
  return 1;
}

/**
 * Count ways two characters can be decoded together.
 * The input is a two-character string: s[i-2..i-1].
 *
 * Cases:
 * 1) If it starts with '0', it's invalid (no 02, 05, etc.) → 0
 * 2) If first is '*':
 *      - If second is '*': see DOUBLE_STAR_CHOICES (15)
 *      - Else (second is '1'..'9'):
 *          If second > '6' → only '1' + second is valid (17..19) → 1 choice
 *          Else            → can be '1' + second or '2' + second (11..16 or 21..26) → 2 choices
 * 3) If first is '1' or '2' and second is '*':
 *      - '1*' → 11..19 → 9 choices
 *      - '2*' → 21..26 → 6 choices
 * 4) If both are digits:
 *      - Parse as a number and check if in [10, 26] → 1 if valid, else 0
 */
function waysForPair(twoChars: string): number {
  // Disallow leading '0' in a 2-digit block like "0x"
  if (twoChars.startsWith(ZERO_CHAR)) return 0;

  const first = twoChars[0];
  const second = twoChars[1];

  // Case: first is '*'
  if (first === STAR_CHAR) {
    if (second === STAR_CHAR) {
      // '**' → 15 possibilities (11..19 and 21..26)
      return DOUBLE_STAR_CHOICES;
    }
    // second is a concrete digit '1'..'9'
    const secondDigit = parseInt(second, 10);
    // If secondDigit ∈ [7..9], only '1' + second is valid (17,18,19) → 1 way
    // If secondDigit ∈ [1..6], both '1' + second and '2' + second are valid → 2 ways
    return secondDigit > 6 ? 1 : 2;
  }

  // Case: first is concrete digit, second is '*'
  if (second === STAR_CHAR) {
    if (first === "1") {
      // '1*' → 11..19 → 9 ways
      return 9;
    }
    if (first === "2") {
      // '2*' → 21..26 → 6 ways
      return 6;
    }
    // '0*', '3*', '4*', ... cannot form a valid 2-digit code in [10..26]
    return 0;
  }

  // Case: both are concrete digits → check numeric range [10..26]
  const value = parseInt(twoChars, 10);
  return value >= TWO_DIGIT_MIN && value <= TWO_DIGIT_MAX ? 1 : 0;
}

/**
 * Main DP function.
 * TABLE[i] = number of ways to decode the prefix s[0..i-1]
 */
function numDecodings(s: string): number {
  const n = s.length;
  if (n === 0) return 0; // (Optional) guard: empty string → 0 ways

  // DP table of size n + 1 (common trick so TABLE[0] = 1 for empty prefix)
  const TABLE = new Array<number>(n + 1).fill(0);

  // Base cases
  TABLE[0] = 1; // one way to decode empty prefix
  TABLE[1] = waysForSingle(s[0]); // ways to decode the first character

  // Fill DP table from left to right
  for (let i = 2; i <= n; i++) {
    // Take last 1 character: s[i-1]
    const singleWays = waysForSingle(s[i - 1]);
    // multiply by TABLE[i-1] because any valid decoding up to i-1 can be extended
    TABLE[i] += singleWays * TABLE[i - 1];

    // Take last 2 characters: s[i-2..i-1]
    const pairWays = waysForPair(s.substring(i - 2, i));
    TABLE[i] += pairWays * TABLE[i - 2];
    TABLE[i] %= MOD;
  }

  return TABLE[n];
}
