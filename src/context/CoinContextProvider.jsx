import { useEffect, useState } from "react";
import { CoinContext } from "./CoinContext";

const CoinContextProvider = ({ children }) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({ name: "usd", symbol: "$" });

  useEffect(() => {
    const fetchAllCoin = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
          {
            headers: {
              accept: "application/json",
              "x-cg-demo-api-key": import.meta.env.VITE_API_KEY_1,
            },
          },
        );
        const data = await res.json();
        setAllCoin(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllCoin();
  }, [currency]);

  return (
    <CoinContext.Provider value={{ allCoin, currency, setCurrency }}>
      {children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
