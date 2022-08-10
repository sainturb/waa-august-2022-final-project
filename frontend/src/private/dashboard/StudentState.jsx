import React, {useEffect, useState} from 'react';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import { useSelector } from "react-redux";

import usaJson from '../../constants/UsaMap.json'

function StudentState() {
    const [data, setData] = useState({mapData: [], min: 0, max: 1});
    const students = useSelector((state) => state.dashboard.students);

    useEffect(() => {
      const category = [...new Set(students.map(s => s.state))];
      const mapData = category.map(c => {
          return {
              name: c, 
              value: students.filter(s => s.state === c).length
          }
      });
      const min = Math.min.apply(Math, mapData.map(d => d.value));
      const max = Math.max.apply(Math, mapData.map(d => d.value));

      setData({...data, mapData, min, max });
    }, [students]);
    

    echarts.registerMap('USA', usaJson, {
        Alaska: {
            left: -131,
            top: 25,
            width: 15
        },
        Hawaii: {
            left: -110,
            top: 28,
            width: 5
        },
        'Puerto Rico': {
            left: -76,
            top: 26,
            width: 2
        }
    });
    
    const option = {
        title: {
          text: 'Number of students per state',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          showDelay: 0,
          transitionDuration: 0.2
        },
        visualMap: {
          left: 'right',
          min: data.mapData.length ? data.min : 0,
          max: data.mapData.length ? data.max : 1,
          inRange: {
            color: [
              '#313695',      
              '#e0f3f8',    
              '#fee090', 
              '#a50026'
            ]
          },
          text: ['High', 'Low'],
          calculable: true
        },
        series: [
          {
            name: 'Student State',
            type: 'map',
            roam: true,
            map: 'USA',
            emphasis: {
              label: {
                show: true
              }
            },
            data: data.mapData
          }
        ]
      };
    return ( 
        <ReactECharts
            option={option}
        />
    );
}

export default StudentState;