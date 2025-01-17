import React, {useEffect, useState} from 'react';
import axios from "axios";
import {STATES} from "../../constants/States";

function Faculty() {
    const states = STATES;
    const [departments, setDepartments] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState({state: '', city: '', zipCode: '', department: ''});
    const fetch = () => {
        axios.get(`/api/faculties`).then(response => {
            if (response.data) {
                setFaculties(response.data);
            }
        });
        axios.get(`/api/departments`).then(response => {
            if (response.data) {
                setDepartments(response.data);
            }
        });
    }

    const fetchQuery = () => {
        axios.get(`/api/faculties/query`, {params: {search}}).then(response => {
            if (response.data) {
                setFaculties(response.data);
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
        axios.get(`/api/faculties/filter`, {params}).then(response => {
            if (response.data) {
                setFaculties(response.data);
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
            axios.delete('/api/faculties/' + faculty.id).then(res => {
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
        <div>
            <div className="text-xl font-bold mb-2">Faculty</div>
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

                    <select name={'department'}
                            value={filter.department}
                            onChange={(event) => onFilterChange(event)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option>Choose the department</option>
                        {
                            departments.map(department => {
                                return (
                                    <option key={department.name} value={department.id}>{department.name}</option>
                                )
                            })
                        }
                    </select>


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
                            Department
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Deleted
                        </th>
                        <th scope="col" className="py-3 px-6">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        faculties.map(faculty => {
                            return (
                                <tr key={faculty.userId}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row"
                                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {faculty.firstName} {faculty.lastname}
                                    </th>
                                    <td className="py-4 px-6">
                                        {faculty.email}
                                    </td>
                                    <td className="py-4 px-6">
                                        {faculty.state}
                                    </td>
                                    <td className="py-4 px-6">
                                        {faculty.city}
                                    </td>
                                    <td className="py-4 px-6">
                                        {faculty.zipCode}
                                    </td>
                                    <td className="py-4 px-6">
                                        {faculty.department ? faculty.department.name : ''}
                                    </td>
                                    <td className="py-4 px-6">
                                        {faculty.is_deleted ? (<span className="font-medium text-gray-600 dark:text-gray-500 ">Deleted</span>) : (<span className="font-medium text-green-600 dark:text-green-500 ">Active</span>)}
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <button
                                            onClick={() => onDelete(faculty)}
                                           className="font-medium  ml-2 text-orange-600 dark:text-orange-500 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Faculty;