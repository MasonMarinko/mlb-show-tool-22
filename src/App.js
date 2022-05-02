import React, { useState, useEffect } from 'react';
import './App.css';
const axios = require('axios').default;

const App = () => {
  const [resData, setResData] = useState([])
  const [pages, setPages] = useState(1)

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
    const url = `https://mlb22.theshow.com/apis/listings.json?&page=${pages}` 
    axios.get(url).then(res => {
      if (!isMounted) return;
      setResData(res.data.listings)
    });
    return () => isMounted = false;
  }, [pages]);

  const nextPrevButton = (e) => {
    e.preventDefault()
    console.log(pages)
    if(e.target.innerText === "Previous Page") {
      setPages(pages - 1)
    } else {
      setPages(pages + 1)
    }
  }

  console.log(resData)

  return (
    <div>
      <button className="previous-page" onClick={nextPrevButton}>
        Previous Page
        </button>
      <button className="next-page" onClick={nextPrevButton}>
        Next Page
        </button>
      <div className = "flex">
    {resData?.map((r,i) =>
      <div className='flex-container' key={i}>
        <img alt="baseball player card" className="card-image" src={r?.item.img}></img>
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
    )}
    </div>
    </div>
    );
  }

export default App;