import { useEffect, useState } from "react";
import "./App.css";
import CoinInfo from "./Components/CoinInfo";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const fetchAllCoinData = async () => {
    if (!list) {
      const response = await fetch(
        "https://min-api.cryptocompare.com/data/all/coinlist?&api_key" + API_KEY
      );
      const json = await response.json();
      setList(json);
    } else {
      searchItems(searchInput);
    }
  };

  const searchItems = (searchValue) => {
    if (searchValue !== "") {
      const filteredData = Object.keys(list.Data).filter((item) =>
        Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      console.log(filteredData);
      setFilteredResults(filteredData.slice(0, 30));
    } else {
      setFilteredResults(Object.keys(list.Data).slice(0, 30));
    }
  };

  useEffect(() => {
    if (list) {
      searchItems(searchInput);
    }
  }, [list]);

  return (
    <div className="whole-page">
      <h1>My Crypto List</h1>
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
              key={coin}
              image={list.Data[coin].ImageUrl}
              name={list.Data[coin].FullName}
              symbol={list.Data[coin].Symbol}
            />
          ))}
      </ul>
    </div>
  );
}

export default App;
