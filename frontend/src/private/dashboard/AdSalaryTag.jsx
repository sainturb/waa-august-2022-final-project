import React, {useEffect, useState}  from 'react';
import ReactEChars from 'echarts-for-react'
import { useSelector } from "react-redux";

function AdSalaryTag() {
  const [data, setData] = useState([]);
  const ads = useSelector((state) => state.dashboard.ads);
  
  useEffect(() => {
      const tags = [...new Set(ads.map(a => a.tags).flat().map(t => t.name))];
      console.log(tags);
      const newData = tags.map(t => {
        return {
          name: t,
          value: ads.filter(a => a.tags.map(i => i.name).includes(t)).reduce((p, c, i, a) => p + c.salary/a.length, 0).toFixed(2)
        };
      });
      setData(newData);
  }, [ads]);


  const option = {
    title: {
      text: 'Average salary per tag',
      left: 'center'
    },
    tooltip: {},
    series: [
      {
        type: 'treemap',
        data: data
      }
    ]
  };
  return ( 
      <ReactEChars option={option}/>
    );
}

export default AdSalaryTag;