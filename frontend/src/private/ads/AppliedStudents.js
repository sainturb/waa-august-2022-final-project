import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router";
import CVDialog from "./CVDialog";

function AppliedStudents () {
    const params = useParams();
    const [students, setStudents] = useState([]);
    const [ad, setAd] = useState(null);
    const [filter, setFilter] = useState({state: '', city: '', zipCode: '', major: '', gpa: ''});

    const fetch = () => {
      axios.get(`/api/advertisements/${params.id}`).then(response => {
          if (response.data) {
              setAd(response.data);
              setStudents(response.data.applied);
          }
      })
    }

    const fetchFilter = () => {
        const params = {};
        Object.keys(filter).forEach(key => {
            if (filter[key]) {
                params[key] = filter[key];
            }
        });
        axios.get(`/api/students/filter`, {params}).then(response => {
            if (response.data) {
                setStudents(response.data);
            }
        });
    }

    const onFilterChange = (event) => {
        setFilter({...filter, [event.target.name]: event.target.value});
    }

    useEffect(() => {
        fetch()
    }, [])

    const onShowCv = (student) => {
        console.log(student);
    }

    return (
        <>
            <div className="text-xl font-bold mb-2">Students</div>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Fullname
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Email
                        </th>
                        <th scope="col" className="py-3 px-6">
                            State
                        </th>
                        <th scope="col" className="py-3 px-6">
                            City
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Zip
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Major
                        </th>
                        <th scope="col" className="py-3 px-6">
                            GPA
                        </th>

                        <th scope="col" className="py-3 px-6">
                            <span className="sr-only">Action</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        students.map(student => {
                            return (
                                <tr key={student.userId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {student.firstName} {student.lastname}
                                    </th>
                                    <td className="py-4 px-6">
                                        {student.email}
                                    </td>
                                    <td className="py-4 px-6">
                                        {student.state}
                                    </td>
                                    <td className="py-4 px-6">
                                        {student.city}
                                    </td>
                                    <td className="py-4 px-6">
                                        {student.zipCode}
                                    </td>
                                    <td className="py-4 px-6">
                                        {student.major ? student.major.name : ''}
                                    </td>
                                    <td className="py-4 px-6">
                                        {student.gpa}
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <CVDialog student={student}/>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AppliedStudents;