

const CurrencyTop = ({fromCurrency, rate}) => {
    //filter first five currencies
    const ratesToFilter = rate.filter(el => el[0] !== fromCurrency);
    const ratesFiltered = ratesToFilter.slice(0,5);
    const ratesToDisplay = ratesFiltered.map((item, index) =>(
        <li className="item" key={index}>
            <h4>{item[0]}</h4>
            <p>{item[1].toFixed(4)}</p>
            </li>
    ));
    return ( 
    <ul className="currencyTop">
        {ratesToDisplay}
    </ul>
     );
}
 
export default CurrencyTop;