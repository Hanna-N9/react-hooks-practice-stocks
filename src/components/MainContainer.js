import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]); //For Stocks section
  const [portfolio, setPortfolio] = useState([]); //For Portfolio section
  const [sortBy, setSortBy] = useState("Alphabetically");
  const [filterBy, setFilterBy] = useState("Tech");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then(res => res.json())
      .then(data => setStocks(data));
  }, []);

  //Allow a user to buy a stock by clicking on it and when it is bought, it should be added to MyPortfolio
  //From GitHub's solution
  function handleAddStock(stockToAdd) {
    const stockInPortfolio = portfolio.find(
      stock => stock.id === stockToAdd.id,
    );
    if (!stockInPortfolio) {
      setPortfolio([...portfolio, stockToAdd]);
    }
  }

  //Allow a user to sell a stock in their Portfolio by clicking on the stock and it should be removed from their Portfolio
  function handleBuyStock(buyStock) {
    setPortfolio(portfolio =>
      portfolio.filter(stock => stock.id !== buyStock.id),
    );
  }
  //Allow a user to sort the list of stocks alphabetically by the ticker name as well as by ascending price.
  //From GitHub's solution
  const sortedStocks = [...stocks].sort((stock1, stock2) => {
    if (sortBy === "Alphabetically") {
      return stock1.name.localeCompare(stock2.name);
    } else {
      return stock1.price - stock2.price;
    }
  });

  //Allow a user to filter stocks based on the type of the stock
  const filteredStocks = sortedStocks.filter(stock => stock.type === filterBy);

  return (
    <div>
      <SearchBar
        sortBy={sortBy}
        onChangeSort={setSortBy}
        filterBy={filterBy}
        onChangeFilter={setFilterBy}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks} onAddStock={handleAddStock} />
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={portfolio} onBuyStock={handleBuyStock} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
