import React from 'react';

const CurrencyRow = (props) => {

    const {currencyOptions, selectCurrency, onChangeCurrency, onChangeAmount, amount, currencySymbols, select} = props;

    const optionValue = currencyOptions.map((option, index) => (
        <option key={index} value={option}>{`${currencySymbols[option]} (${option})`}</option>
    ));

    return ( 

        <div>
            <input 
                type="number" 
                className="input" 
                value={amount} 
                onChange={onChangeAmount}
                
            />
            <select 
                value={selectCurrency} 
                onChange={onChangeCurrency}
                select={select}
            >
                {optionValue}
            </select>
        </div>
     );
}
 
export default CurrencyRow;