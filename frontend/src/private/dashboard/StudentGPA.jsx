import React, {useEffect, useState}  from 'react';
import ReactEChars from 'echarts-for-react'
import { useSelector } from "react-redux";

function StudentGPA() {

  const [gpa, setGpa] = useState(0);
  const students = useSelector((state) => state.dashboard.students);

  useEffect(() => {
    const avgGpa = students.reduce((p, c, i, a) => p + c.gpa/a.length, 0).toFixed(1);
    setGpa(avgGpa);
  }, [students]);

  const option = {
    title: {
        text: 'Average GPA',
        left: 'center'
    },
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
      {
        min: 0,
        max: 4,
        name: 'Average GPA',
        type: 'gauge',
        detail: {
          formatter: '{value}'
        },
        data: [
          {
            value: gpa,
            name: 'GPA'
          }
        ]
      }
    ]
  };
  return <ReactEChars option={option}/>;
}

export default StudentGPA;