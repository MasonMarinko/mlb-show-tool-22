import React, { useState, useEffect } from 'react';
import './App.css';
const axios = require('axios').default;

const App = () => {
  const [resData, setResData] = useState([])
  const [buyNowPrice, setBuyNowPrice] = useState({})
  const [sellNowPrice, setSellNowPrice] = useState({})
  const [form, setForm] = useState({});
  const [areStatsOpen, setAreStatsOpen] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [isSold, setIsSold] = useState(false);
  const [refreshTime, setRefreshTime] = useState({elapsedTime:null});

  const startCounting = () => {
    setInterval(countUp, 1000);
  }

  const countUp = () => {
    setRefreshTime(({ elapsedTime }) => ({ elapsedTime: elapsedTime + 1 }))  }

  useEffect(() => {
    startCounting();
  },[])

  console.log(refreshTime.elapsedTime)

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
let four = "https://mlb22.theshow.com/apis/listings.json?&page=4"
let five = "https://mlb22.theshow.com/apis/listings.json?&page=5"
let six = "https://mlb22.theshow.com/apis/listings.json?&page=6"
let seven = "https://mlb22.theshow.com/apis/listings.json?&page=7"
let eight = "https://mlb22.theshow.com/apis/listings.json?&page=8"
let nine = "https://mlb22.theshow.com/apis/listings.json?&page=9"
let ten = "https://mlb22.theshow.com/apis/listings.json?&page=10"
let eleven = "https://mlb22.theshow.com/apis/listings.json?&page=11"
let twelve = "https://mlb22.theshow.com/apis/listings.json?&page=12"
let thirteen = "https://mlb22.theshow.com/apis/listings.json?&page=13"
let fourteen = "https://mlb22.theshow.com/apis/listings.json?&page=14"
 
const requestOne = axios.get(one);
const requestTwo = axios.get(two);
const requestThree = axios.get(three);
const requestFour = axios.get(four);
const requestFive = axios.get(five);
const requestSix = axios.get(six);
const requestSeven = axios.get(seven);
const requestEight = axios.get(eight);
const requestNine = axios.get(nine);
const requestTen = axios.get(ten);
const requestEleven = axios.get(eleven);
const requestTwelve = axios.get(twelve);
const requestThirteen = axios.get(thirteen);
const requestFourteen = axios.get(fourteen);
 
axios.all([requestOne, requestTwo, requestThree, requestFour, requestFive, requestSix, requestSeven, requestEight, requestNine, requestTen, requestEleven, requestTwelve, requestThirteen, requestFourteen]).then(axios.spread((...responses) => {
  const responseOne = responses[0].data.listings
  const responseTwo = responses[1].data.listings
  const responseThree = responses[2].data.listings
  const responseFour = responses[3].data.listings
  const responseFive = responses[4].data.listings
  const responseSix = responses[5].data.listings
  const responseSeven = responses[6].data.listings
  const responseEight = responses[7].data.listings
  const responseNine = responses[8].data.listings
  const responseTen = responses[9].data.listings
  const responseEleven = responses[10].data.listings
  const responseTwelve = responses[11].data.listings
  const responseThirteen = responses[12].data.listings
  const responseFourteen = responses[13].data.listings
  setResData(responseOne.concat(responseTwo, responseThree, responseFour, responseFive, responseSix, responseSeven, responseEight, responseNine, responseTen, responseEleven, responseTwelve, responseThirteen, responseFourteen))
})).catch(errors => {
  return errors;
})
  }, []);  
  
  const profitOnly = (resData.filter((r) => {
    const commissionSellPrice = r.best_sell_price - (r.best_sell_price * .10)
    const buySellDifference = commissionSellPrice - r.best_buy_price
    return buySellDifference > 1000 && r.best_buy_price !== 0
  }).map(p=>{
    const commissionSellPrice = p.best_sell_price - (p.best_sell_price * .10)
    const buySellDifference = commissionSellPrice - p.best_buy_price
    return ({...p, buySellDifference})
  }).sort((a, b) => b.buySellDifference - a.buySellDifference)) 
  
  console.log(profitOnly)

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
    setAreStatsOpen(true)
  }

  const onPostPurchaseChange = (e) => {
    if (e.target.name === "Final Purchased Price") {
      setBuyNowPrice({
        ...buyNowPrice,
        "Final Purchased Price": e.target.value
      })

    } else {
      if (!e.target.value){
        return
      } else {
        setSellNowPrice({
          ...sellNowPrice,
          [e.target.name]: e.target.value
        })
      }
    }
  }


  const onPostPurchaseSubmit = (e) => {
    e.preventDefault(e);
    if (buyNowPrice["Final Purchased Price"] && !sellNowPrice["Final Sold Price"]) {
      setIsPurchased(true)
      setForm({
        "Buy Now Price": buyNowPrice["Final Purchased Price"],
        "Sell Now Price": form["Sell Now Price"]
      })
    } else if (sellNowPrice["Final Sold Price"] && !buyNowPrice["Final Purchased Price"]) {
      setIsSold(true)
      setForm({
        "Sell Now Price": sellNowPrice["Final Sold Price"],
        "Buy Now Price": form["Buy Now Price"]
      }) 
    } else {
      setIsPurchased(true)
      setIsSold(true)
      setForm({
        "Buy Now Price": buyNowPrice["Final Purchased Price"],
        "Sell Now Price": sellNowPrice["Final Sold Price"]
      })
    }
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
           <h1 className='border-bottom useful-title'>Useful Information:</h1>
         <div className = "losing-container">
         <div className="entered-values-container">
           <h3 className="underline">Buy Now Entered:</h3><br/>
           <p>${form["Buy Now Price"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
           <h3 className="underline">Sell Now Entered:</h3>
           <p>${form["Sell Now Price"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
           </div>
         <h3 className="title-padding-top">Money Lost (Based on buy/sell prices above)</h3>
         <div className="border-bottom"></div>
         <p className="losing-header">{"Losing: " + '$' + Math.abs(buySellDifference).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
         <h3 className="title-padding-top">Recommendation</h3>
         <div className="border-bottom"></div>
         <p className="losing-header">{"DON'T buy at current inputted price of " + '$' + buyPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
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
    } else {
      return (
        <div className = "stats-container">
           <h1 className='border-bottom useful-title'>Useful Information:</h1>
         <div className = "making-container">
           <div className="entered-values-container">
           <h3 className="underline">{isPurchased ? "Purchased Price" : "Buy Now Entered"}:</h3><br/>
           <p>${form["Buy Now Price"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
           <h3 className="underline">{isSold ? "Sold For Price" : "Sell Now Entered"}:</h3>
           <p>${form["Sell Now Price"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
           </div>
         <h3 className="title-padding-top">Money Made</h3>
         <p className="parentheses-text">(Based on buy/sell prices above)</p>
         <div className='border-bottom'></div>
         <p className="making-header">{"Making: " + '$' + Math.abs(buySellDifference).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
         <h3 className="title-padding-top" >Recommendation</h3>
         <div className='border-bottom'></div>
         <p className="making-header">{"BUY at current inputted price of " + '$' + buyPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
         <h3 className="title-padding-top breakEven">Break Even Price </h3>
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

  return (
    <div>
      <div className = "flex">
        <h1 className="main-title">Flip Calculator</h1>
        {!areStatsOpen && (
      <form className="form-styling" onSubmit={(e) => onSubmit(e)}>
        <label>
          <span  className='input-labels'>Buy Now Price</span>
          <input onChange={e =>onFieldChange(e)} type="integer" name="Buy Now Price" />
        </label>
        <label className='sell-price'>
          <span className='input-labels'>Sell Now Price</span>
          <input onChange={e =>onFieldChange(e)} type="integer" name="Sell Now Price" />
          <br/>
          <br/>
          <input className="submit-button" type="submit" value="Submit" />
          </label>
      </form>
        )}
      {areStatsOpen && (
        gainLossHeader(form["Buy Now Price"], form["Sell Now Price"])
      )}
      <h1 className="main-title">CARDS WITH OVER $1000 FLIP VALUE</h1>
      <h2 className='secondary-title'>{refreshTime.elapsedTime >= 60 && "CARD DATA OVER 1 MINUTE OLD, PLEASE CONSIDER REFRESHING PAGE"}</h2>
      <div className='refresh-button-container'>
      {refreshTime.elapsedTime >= 60 && <button className="refresh-button" onClick={e => window.location.reload()}>REFRESH</button>}
      </div>
    {profitOnly?.map((r,i) =>
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