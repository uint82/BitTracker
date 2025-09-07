import React, { useContext, useEffect, useState } from "react";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  const inputHandler = (event) => {
    const value = event.target.value;
    setInput(value);

    if (value === "") {
      setDisplayCoin(allCoin);
    } else {
      const filteredCoins = allCoin.filter(
        (item) =>
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.symbol.toLowerCase().includes(value.toLowerCase()),
      );
      setDisplayCoin(filteredCoins);
    }
  };

  const searchHandler = async (event) => {
    event.preventDefault();
    // This is now optional since filtering happens in real-time
    // But keeping it for form submission consistency
    if (input === "") {
      setDisplayCoin(allCoin);
    } else {
      const coins = allCoin.filter(
        (item) =>
          item.name.toLowerCase().includes(input.toLowerCase()) ||
          item.symbol.toLowerCase().includes(input.toLowerCase()),
      );
      setDisplayCoin(coins);
    }
  };

  // Clear search function
  const clearSearch = () => {
    setInput("");
    setDisplayCoin(allCoin);
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="p-2 pb-8 md:pb-24 text-white min-h-screen bg-gray-800">
      <div className="max-w-xl mx-auto mt-20 flex flex-col items-center text-center gap-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
          Stay Ahead. Stay Informed.
        </h1>
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-yellow-400 font-semibold mb-2">
          Largest Crypto Network
        </h2>
        <h4 className="text-lg md:text-xl lg:text-2xl font-light mb-4">
          Get Real-Time Updates | Analyze Market Trends | Make Smarter
          Investments
        </h4>
        <p className="text-2xl md:text-3xl font-bold text-white italic">
          Explore now!!!
        </p>

        <form
          onSubmit={searchHandler}
          className="flex w-full items-center max-w-md mx-auto"
        >
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.897-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <input
              onChange={inputHandler}
              list="coinlist"
              value={input}
              type="text"
              id="simple-search"
              className="bg-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search crypto by name or symbol..."
              autoComplete="off"
            />
            <datalist id="coinlist">
              {displayCoin.slice(0, 20).map((item, index) => (
                <option key={index} value={item.name}>
                  {item.symbol.toUpperCase()}
                </option>
              ))}
            </datalist>
            {/* Clear button */}
            {input && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-400 hover:text-white"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          <button
            type="submit"
            className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>

        {/* Search results info */}
        {input && (
          <div className="text-sm text-gray-300">
            {displayCoin.length === 0 ? (
              <p>No cryptocurrencies found matching "{input}"</p>
            ) : (
              <p>
                Showing {Math.min(displayCoin.length, 10)} of{" "}
                {displayCoin.length} results
                {displayCoin.length > 10 && " (top 10 displayed)"}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto mt-8 md:mt-16 p-2 md:p-4 rounded-lg bg-gray-800 bg-opacity-40 shadow-lg border-2 border-white">
        <div className="grid grid-cols-10 md:grid-cols-10 p-2 md:p-4 border-b border-white text-xs md:text-lg font-semibold text-gray-200">
          <p className="col-span-2 md:col-span-1">#</p>
          <p className="col-span-4 md:col-span-3">Coins</p>
          <p className="col-span-2 text-center">Price</p>
          <p className="col-span-2 text-center">24H Change</p>
          <p className="hidden md:col-span-2 md:text-right md:block">
            Market Cap
          </p>
        </div>
        {displayCoin.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <p className="text-lg">No cryptocurrencies found</p>
            <p className="text-sm mt-2">Try adjusting your search terms</p>
          </div>
        ) : (
          displayCoin.slice(0, 10).map((item, index) => (
            <Link
              to={`/coin/${item.id}`}
              className="grid grid-cols-10 md:grid-cols-10 p-2 md:p-4 border-b border-gray-600 last:border-none hover:bg-gray-700 hover:bg-opacity-30 transition-colors text-xs md:text-base text-gray-100"
              key={index}
            >
              <p className="col-span-2 md:col-span-1">{item.market_cap_rank}</p>
              <div className="col-span-4 md:col-span-3 flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-8 h-8 mr-2"
                />
                <p className="hidden md:block">
                  {item.name} - <span className="uppercase">{item.symbol}</span>
                </p>
                <p className="md:hidden uppercase">{item.symbol}</p>
              </div>
              <p className="col-span-2 text-center">
                {currency.symbol} {item.current_price.toLocaleString()}
              </p>
              <p
                className={
                  item.price_change_percentage_24h > 0
                    ? "col-span-2 text-green-400 text-center"
                    : "col-span-2 text-red-400 text-center"
                }
              >
                {item.price_change_percentage_24h.toFixed(2)}%
              </p>
              <p className="hidden md:col-span-2 md:text-right md:block">
                {currency.symbol} {item.market_cap.toLocaleString()}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
