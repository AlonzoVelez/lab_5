import { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinInfo = ({ image, name, symbol }) => {
  const [price, setPrice] = useState(null);
  useEffect(() => {
    const getCoinPrice = async () => {
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=` +
          API_KEY
      );

      const json = await response.json();
      if (json.USD) {
        setPrice(json);
      }
    };
    getCoinPrice().catch(console.error);
  }, []);
  console.log(name, price);
  if (price) {
    console.log("NAME: PRICE", name, price);
  }

  return (
    <div>
      <li className="main-list" key={symbol}>
        <img
          className="icons"
          src={`https://www.cryptocompare.com${image}`}
          alt={`Small icon for ${name} crypto coin`}
        />
        {name} <span className="tab"></span>
        {price ? `$${price.USD} USD` : "Price Unavailable"}
      </li>
    </div>
  );
};

export default CoinInfo;
