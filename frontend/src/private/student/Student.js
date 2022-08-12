import React, {useEffect, useState} from 'react';
import axios from "axios";
import {STATES} from "../../constants/States";
import ReadComments from "./ReadComments";

function Student () {
    const states = STATES;
    const [departments, setDepartments] = useState([]);
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState({state: '', city: '', zipCode: '', major: '', gpa: ''});


    const fetch = () => {
        axios.get(`/api/students`).then(response => {
            if (response.data) {
                setStudents(response.data);
            }
        });
        axios.get(`/api/departments`).then(response => {
            if (response.data) {
                setDepartments(response.data);
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

    const onDelete = (faculty) => {
        const yes = window.confirm('Do you want to continue this action?');
        if (yes) {
            axios.delete('/api/students/' + faculty.id).then(res => {
                alert('deleted');
            });
        }
    }

    const onClear = () => {
        Object.keys(filter).forEach(key => filter[key] = '');
        setFilter({...filter})
        fetch()
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
                        <select name={'state'}
                                value={filter.state}
                                onChange={(event) => onFilterChange(event)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option>Choose the state</option>
                            {
                                states.map(state => {
                                    return (
                                        <option key={state.name} value={state.name}>{state.name}</option>
                                    )
                                })
                            }
                        </select>
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

                    <select name={'major'}
                            value={filter.major}
                            onChange={(event) => onFilterChange(event)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option>Choose the major</option>
                        {
                            departments.map(department => {
                                return (
                                    <option key={department.name} value={department.id}>{department.name}</option>
                                )
                            })
                        }
                    </select>

                    <input type="number"
                           value={filter.gpa}
                           name={'gpa'}
                           onChange={(event) => onFilterChange(event)}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="GPA" required/>


                </div>
                <button type="button" onClick={() => onClear()}
                        className="mr-2 text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 mb-6 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800">Clear
                </button>
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
                        <th scope="col" className="p-3">
                            Fullname
                        </th>
                        <th scope="col" className="p-3">
                            Email
                        </th>
                        <th scope="col" className="p-3">
                            State
                        </th>
                        <th scope="col" className="p-3">
                            City
                        </th>
                        <th scope="col" className="p-3">
                            Zip
                        </th>
                        <th scope="col" className="p-3">
                            Major
                        </th>
                        <th scope="col" className="p-3">
                            GPA
                        </th>
                        <th scope="col" className="p-3">
                            Comments
                        </th>
                        <th scope="col" className="p-3">
                            Status
                        </th>
                        <th scope="col" className="p-3">
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
                                    <td className="p-3">
                                        {student.email}
                                    </td>
                                    <td className="p-3">
                                        {student.state}
                                    </td>
                                    <td className="p-3">
                                        {student.city}
                                    </td>
                                    <td className="p-3">
                                        {student.zipCode}
                                    </td>
                                    <td className="p-3">
                                        {student.major ? student.major.name : ''}
                                    </td>
                                    <td className="p-3">
                                        {student.gpa}
                                    </td>
                                    <td className="p-3">
                                        <ReadComments student={student} />
                                    </td>
                                    <td className="p-3">
                                        {student.is_deleted ? (<span className="font-medium text-gray-600 dark:text-gray-500 ">Deleted</span>) : (<span className="font-medium text-green-600 dark:text-green-500 ">Active</span>)}
                                    </td>
                                    <td className="p-3 text-right">
                                        <button
                                            onClick={() => onDelete(student)}
                                            className="font-medium  ml-2 text-orange-600 dark:text-orange-500 hover:underline">Delete</button>
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