import React, {useEffect, useState} from 'react';
import axios from "axios";

function Student () {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState(null);
    const [filter, setFilter] = useState({state: null, city: null, zipCode: null, major: null, gpa: null});
    const fetch = () => {
        axios.get(`/api/students`).then(response => {
            if (response.data) {
                setStudents(response.data);
            }
        });
    }

    const fetchQuery = () => {
        axios.get(`/api/students/query`, {params: {search}}).then(response => {
            if (response.data) {
                setStudents(response.data);
            }
        });
    }

    const fetchFilter = () => {
        const params = {};
        Object.keys(filter).forEach(key => {
            if (filter[key]) {
                params[key] = filter[key];
            }
        });
        console.log(params);
        axios.get(`/api/students/filter`, {params}).then(response => {
            if (response.data) {
                setStudents(response.data);
            }
        });
    }

    const onSearch = (event) => {
        setSearch(event.target.value);
        fetchQuery();
    }

    const onFilterChange = (event) => {
        setFilter({...filter, [event.target.name]: event.target.value});
    }

    useEffect(() => {
        fetch();
    }, [])
    return (
        <>
            <div className="text-xl font-bold mb-2">Students</div>
            <div className="overflow-x-auto relative">
                <div className="grid gap-6 mb-6 md:grid-cols-2">

                    <div>
                        <input type="text"
                               value={filter.state}
                               name={'state'}
                               onChange={(event) => onFilterChange(event)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="State" required/>
                    </div>

                    <div>
                        <input type="text"
                               value={filter.city}
                               name={'city'}
                               onChange={(event) => onFilterChange(event)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="City" required/>
                    </div>

                    <input type="text"
                           value={filter.zipCode}
                           name={'zipCode'}
                           onChange={(event) => onFilterChange(event)}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Zip" required/>

                    <input type="text"
                           value={filter.major}
                           name={'major'}
                           onChange={(event) => onFilterChange(event)}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Major" required/>

                    <input type="number"
                           value={filter.gpa}
                           name={'gpa'}
                           onChange={(event) => onFilterChange(event)}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="GPA" required/>


                </div>
                <button type="button" onClick={() => fetchFilter()}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 mb-6 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Filter
                </button>
                <hr className="mb-6"/>
                <div className="mb-6">
                    <input type="text"
                           value={search}
                           onChange={(event) => onSearch(event)}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Firstname OR Lastname OR Email contains" required/>
                </div>
            </div>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Firstname
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Lastname
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
                            GPA
                        </th>
                        <th scope="col" className="py-3 px-6">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        students.map(student => {
                            return (
                                <tr key={student.userId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {student.firstName}
                                    </th>
                                    <td className="py-4 px-6">
                                        {student.lastname}
                                    </td>
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
                                        {student.gpa}
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
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

export default Student;