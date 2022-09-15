import React, { useCallback, useState } from "react";

const MAX_LEN = 14;
const pattern = "(###) ###-####";
function getDisplayValue(str) {
  const result = [];
  let si = 0;
  let pi = 0;
  const numStr = str
    .split("")
    .filter((char) => Number.isFinite(parseInt(char)));
  while (si < numStr.length && pi < pattern.length) {
    while (pattern[pi] !== "#") {
      result.push(pattern[pi]);
      pi++;
    }
    result.push(numStr[si]);
    si++;
    pi++;
  }

  return result.join("");
}
export default function PhoneInput() {
  const [phoneNumber, setPhoneNumber] = useState([]);
  const handlePhoneNumberChange = useCallback(
    (e) => {
      setPhoneNumber(getDisplayValue(e.target.value));
    },
    [setPhoneNumber]
  );

  const handleSubmit = useCallback(() => {
    setPhoneNumber("");
  }, [setPhoneNumber]);

  return (
    <div>
      <input
        id="text"
        type="text"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder="(555) 555-5555"
      />
      <button disabled={phoneNumber.length !== MAX_LEN} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
