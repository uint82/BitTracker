import React, { useContext } from "react";
import { CoinContext } from "../context/CoinContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "usd": {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
      case "eur": {
        setCurrency({ name: "eur", symbol: "€" });
        break;
      }
      case "idr": {
        setCurrency({ name: "idr", symbol: "Rp" });
        break;
      }
      default: {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
    }
  };

  return (
    <div className="navbar text-white border-b-2 border-gray-700 py-4 px-4 md:px-10 lg:px-16 flex items-center justify-between">
      <Link to="/" className="flex items-center">
        <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-white hover:text-gray-300 transition-colors duration-200">
          🪙 Bit-Tracker
        </span>
      </Link>
      <div className="flex items-center">
        <select
          onChange={currencyHandler}
          className="text-white bg-gray-900 border-2 border-white rounded-md py-1 px-8 md:py-2 md:px-14 lg:px-20"
        >
          <option value="usd">USD</option>
          <option value="idr">IDR</option>
          <option value="eur">EUR</option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;
