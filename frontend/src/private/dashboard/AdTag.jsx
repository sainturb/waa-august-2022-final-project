import React, {useEffect, useState} from 'react';
import ReactEChars from 'echarts-for-react'
import { useSelector } from "react-redux";

function AdTag() {

  const [data, setData] = useState([]);
  const ads = useSelector((state) => state.dashboard.ads);
  
  useEffect(() => {
      const tags = [...new Set(ads.map(a => a.tags).flat().map(t => t.name))];
      console.log(tags);
      const newData = tags.map(t => {
        return {
          name: t,
          value: ads.filter(a => a.tags.map(i => i.name).includes(t)).length
        };
      });
      setData(newData);
  }, [ads]);


  const option = {
      title: {
        text: 'Job ads per tag',
        left: 'center'
      }, tooltip:{},
      series: [
        {
          name: 'Tag Usage',
          type: 'pie',
          radius: '60%',
          data: data
        }
      ]
    };
  return ( 
      <ReactEChars option={option}/>
    );
}

export default AdTag;