import { useEffect, useState } from "react";
import "./App.css";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(null);

  const fetchAllCoinData = async () => {
    const response = await fetch(
      "https://min-api.cryptocompare.com/data/all/coinlist?&api_key" + API_KEY
    );
    const json = await response.json();
    setList(json);
  };

  useEffect(() => {});

  return (
    <div className="whole-page">
      <h1>My Crypto List</h1>
      <button onClick={fetchAllCoinData}></button>
      <ul>
        {list &&
          Object.entries(list.Data).map(([coin]) => (
            <li key={list.Data[coin].FullName}>{list.Data[coin].FullName}</li>
          ))}
      </ul>
    </div>
  );
}

export default App;
