import React from 'react';
import uuid from 'react-uuid'

const CurrencyRow = (props) => {

    const {currencyOptions, selectCurrency, onChangeCurrency, onChangeAmount, amount, currencySymbols, select} = props;
    
    //remove undefined values
    const currencyName = currencyOptions.filter(value =>{
        return currencySymbols[value] !== undefined
    })
    
    const optionValue = currencyName.map(option => (
        <React.Fragment key={uuid()}>
        <option key={uuid()} value={option}>{`${currencySymbols[option]} (${option})`}</option>
        </React.Fragment>
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