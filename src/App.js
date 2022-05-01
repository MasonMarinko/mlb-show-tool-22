import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './App.css';
const axios = require('axios').default;


const App = () => {
  const [resData, setResData] = useState([])

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
    resData?.map((r) =>
      <div className='flex-container'>
        <img className="one" src={r?.item.img}></img>
        <div className='two'>
          <p>
            Name: {r?.listing_name}
          </p>
          <p>
            Best Sell Price: {r?.best_sell_price}
          </p>
          <p>
            Best Buy Price: {r?.best_buy_price}
          </p>
        </div>
      </div>
    )
  );
}

export default App;