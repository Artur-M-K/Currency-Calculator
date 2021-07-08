import React from 'react';

const CurrencyRow = (props) => {

    const {currencyOptions, selectCurrency, onChangeCurrency, onChangeAmount, amount, currencySymbols, select} = props;
    
    //remove undefined values
    const currencyName = currencyOptions.filter(value =>{
        return currencySymbols[value] !== undefined
    })
    
    const optionValue = currencyName.map(option => (
        <option key={option.id} value={option}>{`${currencySymbols[option]} (${option})`}</option>
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