// ---------------------------------------------
// Character sets & tiny helpers
// ---------------------------------------------

// Allowed characters for each role
const DIGIT_SET = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
const SIGN_SET = new Set(["+", "-"]);
const SPECIAL_SET = new Set([".", "e"]); // non-digit markers we track counts for

// Quick tests
const isDigit = (ch: string) => DIGIT_SET.has(ch);
const isSign = (ch: string) => SIGN_SET.has(ch);

/**
 * Main entry:
 *  - normalize to lowercase (so 'E' behaves like 'e')
 *  - first, ensure we don't have more than one '.' and more than one 'e'
 *  - then validate either as a plain decimal/integer OR exponential form
 */
function isNumber(input: string): boolean {
  const s = input.toLowerCase();

  if (!hasValidMarkerCounts(s)) return false; // at most one '.' and at most one 'e'
  return isValidExponentialOrPlain(s); // validate structure
}

// ---------------------------------------------
// Structure checks
// ---------------------------------------------

/**
 * Ensure we don't use '.', 'e' more than once each.
 * (We ignore signs here; they are validated later per-part.)
 */
function hasValidMarkerCounts(s: string): boolean {
  // Single-character quick check: must be a digit if length = 1
  if (s.length === 1) return isDigit(s[0]);

  const counts = new Map<string, number>();
  for (const ch of s) {
    if (!SPECIAL_SET.has(ch)) continue;
    counts.set(ch, (counts.get(ch) ?? 0) + 1);
    if ((counts.get(ch) ?? 0) > 1) return false; // early exit if any exceeds 1
  }
  return true;
}

/**
 * Numbers may be:
 *   - plain decimal/integer (no 'e'), or
 *   - exponential form "<decimal>e<integer>"
 */
function isValidExponentialOrPlain(s: string): boolean {
  if (!s.includes("e")) {
    // No exponent: treat as decimal (which delegates to integer if no dot)
    return isValidDecimal(s);
  }

  // Exactly one 'e' is guaranteed by hasValidMarkerCounts
  const [mantissa, exponent] = s.split("e");

  // Mantissa: decimal allowed; Exponent: integer only
  if (!isValidDecimal(mantissa)) return false;
  if (!isValidInteger(exponent)) return false;

  return true;
}

/**
 * Valid decimal rules in this implementation:
 *   - Optional sign on the LEFT part is allowed.
 *   - If there is no '.', this is just an integer.
 *   - If there is a '.', at least one side (left or right) must provide a digit.
 *   - The RIGHT part cannot start with a sign and must be digits if present.
 */
function isValidDecimal(s: string): boolean {
  if (!s.includes(".")) {
    // No dot → must be an integer (which handles optional leading sign)
    return isValidInteger(s);
  }

  const [left, right] = s.split(".");

  // Is the left side only a sign?
  const leftIsOnlySign = left.length === 1 && isSign(left[0]);
  const leftHasChars = left.length > 0;
  const rightHasChars = right.length > 0;

  // If we have chars on the left, they must either be just a sign, or a valid integer
  // (Note: "valid integer" already permits a leading sign, so we exclude the pure-sign case here)
  if (leftHasChars && !leftIsOnlySign && !isValidInteger(left)) return false;

  // We must have at least one digit overall around the dot:
  //  - not both sides empty (".")
  if (!leftHasChars && !rightHasChars) return false;

  // If there's nothing on the right and left is just a sign, like "+."
  if (!rightHasChars && leftIsOnlySign) return false;

  // Empty right side like "12." is OK by this implementation
  if (!rightHasChars) return true;

  // Right side cannot start with a sign and must be all digits
  if (isSign(right[0]) || !isAllDigits(right)) return false;

  return true;
}

/**
 * Valid integer rules in this implementation:
 *   - Optional leading '+' or '-'
 *   - Must contain at least one digit
 *   - Remaining characters must be digits only
 */
function isValidInteger(s: string): boolean {
  if (s.length === 0) return false;

  // Single character: must be a digit (a lone '+' or '-' is not valid)
  if (s.length === 1) return isDigit(s[0]);

  const start = isSign(s[0]) ? 1 : 0;

  // All remaining characters must be digits
  for (let i = start; i < s.length; i++) {
    if (!isDigit(s[i])) return false;
  }
  return true;
}

// ---------------------------------------------
// Utilities
// ---------------------------------------------

/** Returns true iff every character is a decimal digit. */
function isAllDigits(segment: string): boolean {
  for (const ch of segment) {
    if (!isDigit(ch)) return false;
  }
  return true;
}
