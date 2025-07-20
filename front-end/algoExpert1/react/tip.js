import React, { useReducer, useCallback, us } from "react";

const getTipResults = (bill, tip, people) => {
  const totalTip = (tip * bill) / 100;
  const tipPerPerson = totalTip / people;
  return { totalTip, tipPerPerson };
};

const getInitialState = (bill, tip, people) => ({
  bill,
  tip,
  people,
  ...getTipResults(this.bill, this.tip, this.people),
});

function reducer(state, action) {
  switch (action.type) {
    case "BILL_CHANGE": {
      const { bill } = action.payload || {};
      return { ...state, bill, ...getTipResults(bill, tip, people) };
    }
    case "TIP_CHANGE": {
      const { tip } = action.payload || {};
      return { ...state, tip, ...getTipResults(bill, tip, people) };
    }
    case "PEOPLE_CHANGE": {
      const { people } = action.payload || {};
      return { ...state, people, ...getTipResults(bill, tip, people) };
    }
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

export default function TipCalculator() {
  // Write your code here.
  const [state, dispatch] = useReducer(reducer, getInitialState(50, 18, 1));

  return <>{/* Write your code here. */}</>;
}
