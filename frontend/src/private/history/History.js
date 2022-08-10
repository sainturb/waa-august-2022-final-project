import React, {useEffect, useState} from 'react';
import axios from "axios";

function History () {
    const [history, setHistory] = useState([]);
    const [search, setSearch] = useState(undefined);
    const [filter, setFilter] = useState({startDate: undefined, endDate: undefined});
    const fetch = () => {
        axios.get(`/api/histories`).then(response => {
            if (response.data) {
                setHistory(response.data);
            }
        });
    }

    const fetchQuery = () => {
        axios.get(`/api/histories/query`, {params: {search}}).then(response => {
            if (response.data) {
                setHistory(response.data);
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
        axios.get(`/api/histories/filter`, {params}).then(response => {
            if (response.data) {
                setHistory(response.data);
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

    const onClear = () => {
        Object.keys(filter).forEach(key => filter[key] = '');
        setFilter({...filter})
        fetch();
    }

    useEffect(() => {
        fetch();
    }, [])
    return (
        <div>
            <div className="text-xl font-bold mb-2">Job History</div>
            <div className="overflow-x-auto relative">
                <div className="grid gap-6 mb-6 md:grid-cols-2">

                    <div>
                        <label>Start date after:</label>
                        <input type="date"
                               value={filter.startDate}
                               name={'startDate'}
                               onChange={(event) => onFilterChange(event)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="Start date after" required/>
                    </div>

                    <div>
                        <label>End date before:</label>
                        <input type="date"
                               value={filter.endDate}
                               name={'endDate'}
                               onChange={(event) => onFilterChange(event)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="End date before" required/>
                    </div>

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
                           placeholder="Company name contains" required/>
                </div>
            </div>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Company Name
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Started
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Ended
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Reason for leaving
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Comment
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        history.map(record => {
                            return (
                                <tr key={record.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {record.companyName}
                                    </th>
                                    <td className="py-4 px-6">
                                        {record.startDate}
                                    </td>
                                    <td className="py-4 px-6">
                                        {record.endDate}
                                    </td>
                                    <td className="py-4 px-6">
                                        {record.reasonToLeave}
                                    </td>
                                    <td className="py-4 px-6">
                                        {record.comments}
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

export default History;