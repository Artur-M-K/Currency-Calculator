import React, {useEffect, useState} from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

  let currentDate = new Date().toLocaleDateString();


const API = 'http://api.exchangeratesapi.io/v1/latest?access_key=10b30a08b12abdf7a71f042bfffa368c';
const API_SYMBOLS = 'http://api.exchangeratesapi.io/v1/symbols?access_key=10b30a08b12abdf7a71f042bfffa368c';


function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [currencySymbols, setCurrencySymbols] = useState([]);
 
  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = (amount * exchangeRate).toFixed(2);
  }else{
    toAmount = amount;
    fromAmount = (amount / exchangeRate).toFixed(2);
  }

  useEffect(() => {
    fetch(API)
    .then(res => res.json())
    .then(data => {
      const firstCurrency = Object.keys(data.rates)[149]
      setCurrencyOptions([data.base, ...Object.keys(data.rates)])
      setFromCurrency(data.base)
      setToCurrency(firstCurrency)
      setExchangeRate(data.rates[firstCurrency])
    })
  }, [])

  useEffect(() => {
    
    if (fromCurrency && toCurrency) {
      fetch(API)
      .then(res => res.json())
      .then(data => {
          setExchangeRate(data.rates[toCurrency])
      })
    }
  },[fromCurrency, toCurrency])
  

  useEffect(() => {
    fetch(API_SYMBOLS)
    .then(res => res.json())
    .then(data => {
      setCurrencySymbols(data.symbols)
    })
  },[])

  function handleFromAmountChange(e) {
    
    let changeRate = e.target.value;
    if (changeRate > 0) {
      setAmount(changeRate);
      setAmountInFromCurrency(true);
    }else return changeRate = 1;
  }

  function handleToAmountChange(e) {
    let changeRate = e.target.value;
    if (changeRate > 0) {
      setAmount(changeRate);
      setAmountInFromCurrency(false);
    }else return changeRate = 1;
    
  }
  
  return (
    <div className="container">
      <h1>Currency Calculator</h1>
      <hr/>
      <h4>Date: {currentDate}</h4>
      <CurrencyRow 
        currencyOptions={currencyOptions}
        selectCurrency={fromCurrency}
        currencySymbols={currencySymbols}
        select="disable"
        // onChangeCurrency={e => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <div className="equals">=</div>
      <CurrencyRow 
        currencyOptions={currencyOptions}
        selectCurrency={toCurrency}
        currencySymbols={currencySymbols}
        select="enable"
        onChangeCurrency={e => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </div>
  );
}

export default App;
