import { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinInfo = ({ id, name, symbol }) => {
  const [price, setPrice] = useState(null);
  useEffect(() => {
    const getCoinPrice = async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}?x_cg_demo_api_key=${API_KEY}`
      );
      const json = await response.json();
      setPrice(json);

      console.log(json);
      console.log(json.market_data);
    };
    getCoinPrice().catch(console.error);
  }, []);

  return (
    <div>
      <li className="main-list" key={symbol}>
        <img
          className="icons"
          src={price ? price.image.thumb : null}
          alt={`Small icon for ${name} crypto coin`}
        />
        {name} <span className="tab"></span>
        {price &&
        price.market_data &&
        price.market_data.current_price &&
        price.market_data.current_price.usd
          ? `$${price.market_data.current_price.usd} USD`
          : "Price Unavailable"}
      </li>
    </div>
  );
};

export default CoinInfo;
