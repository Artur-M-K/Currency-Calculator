import React, {useEffect, useState} from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';
import Graph from './Graph';
import CurrencyTop from './CurrencyTop';

  let date = new Date();
  //set end date format for api 
  let currentDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];
  //set start date format for api
  let startDate = new Date(date.setMonth(date.getMonth()-12)- (date.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];

  
  
function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [currencySymbols, setCurrencySymbols] = useState([]);
  const [histRates, setHistRates] = useState([]);
  const [topCurrencies, setTopCurrencies] = useState([]);
 
  const API = `https://api.exchangerate.host/latest?base=${fromCurrency}`;
  const API_DATE = `https://api.exchangerate.host/timeseries?base=${fromCurrency}&start_date=${startDate}&end_date=${currentDate}`
  const API_SYMBOLS = 'http://api.exchangeratesapi.io/v1/symbols?access_key=10b30a08b12abdf7a71f042bfffa368c';

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
      const firstCurrency = Object.keys(data.rates)[150]
      setCurrencyOptions([data.base, ...Object.keys(data.rates)])
      setFromCurrency(data.base)
      setToCurrency(firstCurrency)
      setExchangeRate(data.rates[firstCurrency])
    })
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    
    if (fromCurrency && toCurrency) {
      fetch(API)
      .then(res => res.json())
      .then(data => {
          setExchangeRate(data.rates[toCurrency])
          let rates = Object.entries(data.rates);
          const currencies = [rates[28], rates[46], rates[150], rates[49],rates[73], rates[116]]
          setTopCurrencies(currencies);
      })
    }
  },[fromCurrency, toCurrency])// eslint-disable-line react-hooks/exhaustive-deps
  
  useEffect(() =>{
    fetch(API_DATE)
    .then(res => res.json())
    .then(data =>{
      setHistRates(data.rates)
    })
  },[fromCurrency])// eslint-disable-line react-hooks/exhaustive-deps

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
    <>
    <div className="container">
      <h1>Currency Calculator</h1>
      <hr/>
      <h4>Date: {currentDate}</h4>
      <CurrencyRow 
        currencyOptions={currencyOptions}
        selectCurrency={fromCurrency}
        currencySymbols={currencySymbols}
        select="disable"
        onChangeCurrency={e => setFromCurrency(e.target.value)}
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
      <Graph 
        dataRates={histRates} 
        toCurrency={toCurrency}
      />
      <CurrencyTop 
        fromCurrency={fromCurrency}
        rate={topCurrencies}
        />
    </div>
    
    </>
  );
}

export default App;
