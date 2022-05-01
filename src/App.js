import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './App.css';
const axios = require('axios').default;

const App = () => {
  const [resData, setResData] = useState([])

  const testing = (buyPrice, sellPrice) => {
    const commissionSellPrice = sellPrice - (sellPrice * .10)
    const buySellDifference = commissionSellPrice - buyPrice
    if (Math.sign(buySellDifference) === -1) {
      return ("Losing: " + '$' + Math.abs(buySellDifference.toFixed(2)))
    } else {
      return ("Making: " + '$' + buySellDifference.toFixed(2))
    }

  }

  useEffect(() => {
    let isMounted = true;
    axios.get(`https://mlb22.theshow.com/apis/listings.json`).then(res => {
      if (!isMounted) return;
      setResData(res.data.listings)
    });
    return () => isMounted = false;
  }, []);

  console.log(resData)

  return (
    resData?.map((r,i) =>
      <div className='flex-container' key={i}>
        <img className="card-image" src={r?.item.img}></img>
        <div className='card-info'>
          <p>
            Name: {r.listing_name}
          </p>
          <p>
            Best Sell Price: ${r.best_sell_price}
          </p>
          <p>
            Best Buy Price: ${r.best_buy_price}
          </p>
          <p>{testing(r.best_buy_price, r.best_sell_price)}</p>
        </div>
      </div>
    )
  );
}

export default App;