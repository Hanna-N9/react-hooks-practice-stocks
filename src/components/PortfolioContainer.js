import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ stocks, onBuyStock }) {
  return (
    <div>
      <h2>My Portfolio</h2>
      {stocks.map(stock => (
        <Stock key={stock.id} stock={stock} onStockClick={onBuyStock} />
      ))}
    </div>
  );
}

export default PortfolioContainer;
