import React, { useState, useEffect } from 'react';
import './App.css';
const axios = require('axios').default;

const App = () => {
  const [resData, setResData] = useState([])
  const [buyNowPrice, setBuyNowPrice] = useState({})
  const [sellNowPrice, setSellNowPrice] = useState({})
  const [form, setForm] = useState({});
  const [updatedForm, setUpdatedForm] = useState({});
  const [areStatsOpen, setAreStatsOpen] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [isSold, setIsSold] = useState(false);

  const gainLossCards = (buyPrice, sellPrice) => {
    const commissionSellPrice = buyPrice - (buyPrice * .10)
    const buySellDifference = commissionSellPrice - sellPrice
    const breakEven = sellPrice/(.90)

    if (Math.sign(buySellDifference) === -1) {
      return (
        <div className = "losing-container">
          {"Losing: " + '$' + Math.abs(buySellDifference).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </div>
      )
    } else {
      return (
        <div>
          <p className = "making-container">
          {"Making: " + '$' + Math.abs(buySellDifference).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </p>
          <div className = "bottom-border"></div>
          <h2>
          Break Even Price
          </h2>
          <p className="breakEven">Based off Current Prices <br/> DO NOT Sell for Less Than <br/><br/> <h3 className = "breakEven-price">{ "$" + breakEven.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h3></p>
        </div>
        )
    }
  }
  useEffect(() => { 
let one = "https://mlb22.theshow.com/apis/listings.json?&page=1"
let two = "https://mlb22.theshow.com/apis/listings.json?&page=2"
let three = "https://mlb22.theshow.com/apis/listings.json?&page=3"
 
const requestOne = axios.get(one);
const requestTwo = axios.get(two);
const requestThree = axios.get(three);
 
axios.all([requestOne, requestTwo, requestThree]).then(axios.spread((...responses) => {
  const responseOne = responses[0].data.listings
  const responseTwo = responses[1].data.listings
  const responseThree = responses[2].data.listings
  setResData(responseOne.concat(responseTwo, responseThree))
})).catch(errors => {
  return errors;
})
  }, []);


  const onFieldChange = (e) => {
    if (e.target.name === "Buy Now Price") {
      setBuyNowPrice({
        ...buyNowPrice,
        [e.target.name]: e.target.value
      })
    } else {
      setSellNowPrice({
        ...sellNowPrice,
        [e.target.name]: e.target.value
      })
    }
  }

  const onSubmit = (e) => {
    e.preventDefault(e);
    setForm({
      "Buy Now Price": buyNowPrice["Buy Now Price"],
      "Sell Now Price": sellNowPrice["Sell Now Price"]
    })
    console.log(gainLossCards(form.buyPrice, form.sellPrice))
    setAreStatsOpen(true)
  }




  // NEED TO FINISH ADDING LOGIC, User needs to be able to update the sold price, and the text will change based on that as well. Make sure to use ispurchased and issold to determine what text to display.

  const onPostPurchaseChange = (e) => {
    console.log(e.target.name)
    if (e.target.name === "Final Purchased Price") {
      setBuyNowPrice({
        ...buyNowPrice,
        "Final Purchased Price": e.target.value
      })
      setIsPurchased(true)
    } else {
      if (!e.target.value){
        return
      } else {
        setSellNowPrice({
          ...sellNowPrice,
          [e.target.name]: e.target.value
        })
        setIsPurchased(true)
      }
    }
  }


  const onPostPurchaseSubmit = (e) => {
    e.preventDefault(e);
    console.log(sellNowPrice)
    if (sellNowPrice["Final Sold Price"] && buyNowPrice["Final Buy Price"] === undefined) {
      setForm({
        "Buy Now Price": buyNowPrice["Final Purchased Price"],
        "Sell Now Price": sellNowPrice["Final Sold Price"]
      })
    } else {
      setForm({
        "Buy Now Price": buyNowPrice["Final Purchased Price"],
        "Sell Now Price": form["Sell Now Price"]
      })
      
    }

    console.log(buyNowPrice["Buy Now Price"])
  //   if (buyNowPrice["Buy Now Price"] !== undefined || sellNowPrice["Sell Now Price"] !== undefined) {
  //     setForm({
  //       "Buy Now Price": buyNowPrice["Buy Now Price"],
  //       "Sell Now Price": sellNowPrice["Sell Now Price"]
  //     })
  // } else {
  //   setBuyNowPrice({
  //     ...buyNowPrice,
  //     [e.target.name]: e.target.value
  //   })
  // }
}

  const startOver = (e) => {
    e.preventDefault(e)
    setAreStatsOpen(false)
    setForm({})
  }

  const gainLossHeader = (buyPrice, sellPrice) => {
    const commissionSellPrice = buyPrice - (buyPrice * .10)
    const buySellDifference = commissionSellPrice - sellPrice
    const breakEven = sellPrice/(.90)

    if (Math.sign(buySellDifference) === -1) {
      return (
        <div className = "stats-container">
           <h1 className='border-bottom'>Useful Information:</h1>
         <div className = "losing-container">
         <h3>Money Lost (Based on buy/sell prices above)</h3>
         <p className="losing-header">{"Losing: " + '$' + Math.abs(buySellDifference).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
         <h3>Recommendation</h3>
         <p className="losing-header">{"DON'T buy at current inputted price of " + '$' + buyPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
         </div>
         <button className="startOver-button" onClick={e =>startOver(e)}>Start Over</button>
       </div>
      )
    } else {
      return (
        <div className = "stats-container">
           <h1 className='border-bottom useful-title'>Useful Information:</h1>
         <div className = "making-container">
           <div className="entered-values-container">
            
           <h3 className="underline">{isPurchased ? "Purchased Price" : "Buy Now Entered"}:</h3><br/>
           <p>${form["Buy Now Price"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
           <h3 className="underline">Sell Now Entered:</h3>
           <p>${form["Sell Now Price"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
           </div>
         <h3>Money Made</h3>
         <p className="parentheses-text">(Based on buy/sell prices above)</p>
         <div className='border-bottom'></div>
         <p className="making-header">{"Making: " + '$' + Math.abs(buySellDifference).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
         <h3>Recommendation</h3>
         <div className='border-bottom'></div>
         <p className="making-header">{"DO buy at current inputted price of " + '$' + buyPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
         <h3 className="breakEven ">Break Even Price </h3>
         <p className="parentheses-text">(at currently entered price DO NOT sell for less than price below)</p> 
         <div className='border-bottom'></div>
         <p className = "breakEven-price">{ "$" + breakEven.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }</p>
         </div>
         <h2 className="update-info-title">Did you buy the card? Enter details of purchase here to update!</h2>
         <form className="form-styling" onSubmit={(e) => onPostPurchaseSubmit(e)}>
        <label className='buy-price'>
          Final Purchased Price:
          <input onChange={e =>onPostPurchaseChange(e)} type="integer" name="Final Purchased Price" />
        </label>
        <label className='sell-price'>
          Final Sold Price:
          <input onChange={e =>onPostPurchaseChange(e)}  type="integer" name="Final Sold Price" />
          <input type="submit" value="Submit" />
          </label>
      </form>
         <button className="startOver-button" onClick={e =>startOver(e)}>Start Over</button>
       </div>
        )
    }
  }

  // const nextPrevButton = (e) => {
  //   e.preventDefault()
  //   console.log(pages)
  //   if(e.target.innerText === "Previous Page") {
  //     setPages(pages - 1)
  //   } else {
  //     setPages(pages + 1)
  //   }
  // }
  // ["Buy Now Price:"]

  return (
    <div>
      {/* <button className="previous-page" onClick={nextPrevButton}>
        Previous Page
        </button>
      <button className="next-page" onClick={nextPrevButton}>
        Next Page
        </button> */}
      <div className = "flex">
        {!areStatsOpen && (
      <form className="form-styling" onSubmit={(e) => onSubmit(e)}>
        <label className='buy-price'>
          Buy Now Price
          <input onChange={e =>onFieldChange(e)} type="integer" name="Buy Now Price" />
        </label>
        <label className='sell-price'>
          Sell Now Price
          <input onChange={e =>onFieldChange(e)} type="integer" name="Sell Now Price" />
          <input type="submit" value="Submit" />
          </label>
      </form>
        )}
      {areStatsOpen && (
        gainLossHeader(form["Buy Now Price"], form["Sell Now Price"])
      )}
    {resData?.map((r,i) =>
      <div className='flex-container' key={i}>
        <img alt="baseball player card" className="card-image" src={r?.item.img}></img>
        <div className='card-info'>
          <p>
            Name: {r.listing_name}
          </p>
          <p>
            Buy Now Price: ${r.best_sell_price}
          </p>
          <p>
            Sell Now Price: ${r.best_buy_price}
          </p>
          <p>{gainLossCards(r.best_sell_price, r.best_buy_price)}</p>
        </div>
      </div>
    )}
    </div>
    </div>
    );
  }

export default App;