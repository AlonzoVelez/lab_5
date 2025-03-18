import { useEffect, useState } from "react";
import "./App.css";
import CoinInfo from "./Components/CoinInfo";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const fetchAllCoinData = async () => {
    console.log(API_KEY);
    if (!list) {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/list?x_cg_demo_api_key=${API_KEY}`
      );
      const json = await response.json();
      setList(json);
    } else {
      searchItems(searchInput);
    }
  };

  const searchItems = (searchValue) => {
    if (searchValue !== "") {
      const filteredData = Object.values(list).filter((item) =>
        Object.values(item.symbol)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      console.log(filteredData);
      setFilteredResults(filteredData.slice(0, 10));
    } else {
      setFilteredResults(Object.keys(list.Data).slice(0, 10));
    }
  };

  useEffect(() => {
    if (list) {
      searchItems(searchInput);
    }
  }, [list]);

  return (
    <div className="whole-page">
      <h1>
        My Crypto List Powered by{" "}
        <a href="https://coingecko.com">
          <img
            className="coingecko"
            src="https://brand.coingecko.com/~gitbook/image?url=https%3A%2F%2F3936590801-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FuBDUa2ODcAkHHV15nEGc%252Fuploads%252Fyr7XfHjVpwlkoQ68Wuhn%252FCombo%2520Mark%2520Dark.png%3Falt%3Dmedia%26token%3D969f37d5-cd4f-4751-840a-762bd616eacd&width=400&dpr=3&quality=100&sign=938729c1&sv=2"
          ></img>
        </a>
      </h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(inputString) => setSearchInput(inputString.target.value)}
      />
      <button onClick={fetchAllCoinData}>Search Coins:</button>
      <ul>
        {filteredResults &&
          filteredResults.map((coin) => (
            <CoinInfo
              key={coin.id}
              id={coin.id}
              name={coin.name}
              symbol={coin.symbol}
            />
          ))}
      </ul>
    </div>
  );
}

export default App;
