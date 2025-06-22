import React, { useState } from "react";

const formatPrice = (price) => {
  if (isNaN(price)) {
    return "-";
  }
  return `$${price.toFixed(2)}`;
};

export default function TipCalculator() {
  // Write your code here.

  const [bill, setBill] = useState(50);
  const [tipPercentage, setTipPercentage] = useState(18);
  const [numberofPeople, setNumberofPeople] = useState(1);

  const totalTip = (bill * tipPercentage) / 100;
  const totalTipPerson = totalTip / numberofPeople;

  return (
    <div id="root">
      <label htmlFor="bill">Bill</label>
      <input
        type="number"
        id="bill"
        value={bill}
        onChange={(e) => setBill(parseInt(e.target.value))}
      />

      <label htmlFor="tipPercentage">Tip Percentage</label>
      <input
        type="number"
        id="tipPercentage"
        value={tipPercentage}
        onChange={(e) => setTipPercentage(parseInt(e.target.value))}
      />

      <label htmlFor="numberofPeople">Number of People</label>
      <input
        type="number"
        id="numberofPeople"
        value={numberofPeople}
        onChange={(e) => setNumberofPeople(parseInt(e.target.value))}
      />

      <p>Total Tip: {formatPrice(totalTip)}</p>

      <p>Tip Per Person: {formatPrice(totalTipPerson)}</p>
    </div>
  );
}
