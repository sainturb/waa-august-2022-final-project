import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import ReactTags from "../shared/ReactTags";
import {useAuth} from "../../App";
import ApplyDialog from "./ApplyDialog";

function Ads () {
    const {user} = useAuth();
    const [ads, setAds] = useState([]);
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState({state: '', city: '', company: '', tags: [] });

    const fetchAds = () => {
        axios.get('/api/advertisements/filter').then(response => {
            if (response.data) {
                setAds(response.data);
            }
        });
    };

    const fetchQuery = () => {
        axios.get('/api/advertisements/search', {params: {query}}).then(response => {
            if(response.data){
                setAds(response.data);
            }
        });
    };

    const fetchFilter = () => {
        const params = {};
        Object.keys(filter).forEach(key => {
            if(filter[key]) {
                if (filter[key] instanceof Array) {
                    params[key] = filter[key].map(i => i.name).join(',');
                } else {
                    params[key] = filter[key];
                }
            }
        });

        axios.get('/api/advertisements/filter', {params: params}).then(response => {
            if(response.data) {
                setAds(response.data);
            }
        });
    };

    const onAddition = (newTag) => {
        setFilter({...filter, tags: [...filter.tags, newTag]});
    };

    const onDelete = (tagIndex) => {
        setFilter({...filter, tags: filter.tags.filter((_, i) => i !== tagIndex)});
    };


    const onSearch = (event) => {
        setQuery(event.target.value);
        fetchQuery();
    }

    const onFilterChange = (event) => {
        setFilter({...filter, [event.target.name]: event.target.value});
    }

    const onClear = () => {
        Object.keys(filter).forEach(key => filter[key] = '');
        setFilter({...filter});
        fetchAds();
    }

    useEffect(() => {
        fetchAds();
    }, [])

    return (
        <div>
            <div className="text-xl font-bold mb-2">Advertisements</div>
            <div className="overflow-x-auto relative">
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <input 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            value={filter.state}
                            name="state"
                            onChange={(event) => onFilterChange(event)}
                            placeholder="State" 
                            required
                        />
                    </div>
                    <div>
                        <input 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            value={filter.city}
                            name="city"
                            onChange={(event) => onFilterChange(event)}
                            placeholder="City" 
                            required
                        />
                    </div>
                    <div>
                        <input 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            value={filter.company}
                            name="company"
                            onChange={(event) => onFilterChange(event)}
                            placeholder="Company" 
                            required
                        />
                    </div>
                    <div>
                        <ReactTags
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            tags={filter.tags}
                            noSuggestionsText="No matching tags"
                            onAddition={onAddition}
                            onDelete={onDelete}
                        />
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
                        value={query}
                        onChange={(event) => onSearch(event)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Title OR Description OR Benefits contains" required/>
                </div>
            </div>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-3">
                            Title
                        </th>
                        <th scope="col" className="py-3 px-3 break-all">
                            Description
                        </th>
                        <th scope="col" className="py-3 px-3">
                            Benefits
                        </th>
                        <th scope="col" className="py-3 px-3">
                            Salary
                        </th>
                        <th scope="col" className="py-3 px-3">
                            Company
                        </th>
                        <th scope="col" className="py-3 px-3">
                            State
                        </th>
                        <th scope="col" className="py-3 px-3">
                            City
                        </th>
                        <th scope="col" className="py-3 px-3">
                            Created by
                        </th>
                        <th scope="col" className="py-3 px-3">
                            Applied count
                        </th>
                        <th scope="col" className="py-3 px-3">
                            Files
                        </th>
                        <th scope="col" className="py-3 px-3">
                            Tags
                        </th>
                        <th scope="col" className="py-3 px-3">

                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        ads.map(ad => {
                            return (
                                <tr key={ad.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th className="py-4 px-3">
                                        {ad.title}
                                    </th>
                                    <td className="py-4 px-3">
                                        {ad.description}
                                    </td>
                                    <td className="py-4 px-3">
                                        {ad.benefit}
                                    </td>
                                    <td className="py-4 px-3">
                                        {ad.salary}
                                    </td>
                                    <td className="py-4 px-3">
                                        {ad.company}
                                    </td>
                                    <td className="py-4 px-3">
                                        {ad.state}
                                    </td>
                                    <td className="py-4 px-3">
                                        {ad.city}
                                    </td>
                                    <td className="py-4 px-3">
                                        {ad.createdBy}
                                    </td>
                                    <td className="py-4 px-3">
                                        {ad.applied.length} applied
                                    </td>
                                    <td className="py-4 px-3">
                                        {ad.files.length} uploaded
                                    </td>
                                    <td className="py-4 px-3">
                                        {ad.tags ? ad.tags.map(t => {
                                            return (<span key={t.id} className={'ml-4 mb-1 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 border'}>{t.name}</span>)
                                        }) : 'Empty'}
                                    </td>
                                    <td className="py-4 px-3">
                                        {user.id}
                                        {
                                            user.username !== ad.createdBy
                                            && user.type === 'student'
                                                && !ad.applied.find(a => a.email === user.email)?
                                                (
                                                   <ApplyDialog fetch={fetchAds} ad={ad} />
                                                ) : ''
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Ads;