import React, {useEffect, useState} from 'react';
import ReactECharts from 'echarts-for-react';
import { useSelector } from "react-redux";
function AdState() { 
    const [data, setData] = useState({category: [], value: []});
    
    const ads = useSelector((state) => state.dashboard.ads);
    
    useEffect(() => {
        const category = [...new Set(ads.map(a => a.state))];
        const value = category.map(c => ads.filter(a => a.state === c).length)
        setData({...data, category, value});
    }, [ads]);

    const option = {
        title: {
            text: 'Number of job ads per location',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2
          },
        xAxis: {
            type: 'category',
            data: data.category
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: data.value,
                type: 'bar'
            }
        ]
    }; 
    return ( 
        <ReactECharts option={option} />
     );
}

export default AdState;