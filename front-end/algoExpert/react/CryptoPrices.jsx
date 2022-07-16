import React, { useCallback, useEffect, useState } from "react";

const CRYPTO_PRICES_API_BASE_URL =
  "https://api.frontendexpert.io/api/fe/cryptocurrencies";

export default function CryptoPrices() {
  // Write your code here.
  const [page, setPage] = useState(0);
  const [coins, setCoins] = useState([]);
  const [hasNext, setHasNext] = useState(false);

  const fetchResults = useCallback(
    async (page) => {
      const response = await fetch(
        `${CRYPTO_PRICES_API_BASE_URL}?page=${page}`
      );
      const data = await response.json();
      setCoins(data.coins);
      setHasNext(data.hasNext);
      return data;
    },
    [setCoins]
  );

  useEffect(() => {
    fetchResults(page);
  }, [page, setCoins]);

  return (
    <div id="root">
      <table>
        <caption>Crypto Prices</caption>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Price</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {coins.map(({ name, price, marketCap }) => {
            return (
              <tr key={name}>
                <th scope="row">{name}</th>
                <td>{price}</td>
                <td>{marketCap}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button disabled={page === 0} onClick={() => setPage(page - 1)}>
        Back
      </button>
      <button disabled={!hasNext} onClick={() => setPage(page + 1)}>
        Next
      </button>
    </div>
  );
}
