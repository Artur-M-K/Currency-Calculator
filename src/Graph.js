import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

const Graph = ({dataRates, toCurrency}) => {
    const styles = {
        fontFamily: "sans-serif",
        textAlign: "center"
      };
      
    const data = [];
    
    const values = Object.entries(dataRates);
    values.map((value) => {
        let d = {
            day: value[0],
            value: value[1][toCurrency],
        }
        return data.push(d)
    })
    
    return ( 
        
        <div style={styles}>
        <LineChart
          width={900}
          height={310}
          data={data}
          margin={{ top: 10, right: 0, bottom: 10, left: 0 }}
        >
          <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false}/>
          <CartesianGrid stroke="#444" strokeDasharray="6 6" />
          <XAxis dataKey="day" />
          <YAxis type="number" domain={[dataMin => (dataMin.toFixed(3)), dataMax => (dataMax.toFixed(3))]} dataKey='value'/>
        </LineChart>
      </div>
     );
}
 
export default Graph;