import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import ReactTags from 'react-tag-autocomplete'

import './ads.css'

function Ads () {
    const [ads, setAds] = useState([]);
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState({state: null, city: null, company: null });

    const [tags, setTags] = useState([]);
    const [tagSuggestions, setTagSuggestions] = useState([]);

    const fetchAds = () => {
        axios.get('/api/advertisements').then(response => {
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
                params[key] = filter[key];
            }
        });

        axios.get('/api/advertisements/filter', {params: params}).then(response => {
            if(response.data) {
                if(tags.length > 0) {
                    response.data = response.data.filter(a => {
                        let isFilter = false;
                        a.tags.forEach(at => {
                            if(tags.map(t => t.id).includes(at.id)) {
                                isFilter = true;
                                return;
                            }
                        });
                        return isFilter;
                    });
                }
                setAds(response.data);
            }
        });
    };

    const fetchTagSuggestions = () => {
        axios.get('api/tags').then(response => {
            if(response.data) {
                setTagSuggestions(response.data);
            }
        });
    };

    const onAddition = (newTag) => {
        setTags([...tags, newTag]);
    };

    const onDelete = (tagIndex) => {
        setTags(tags.filter((_, i) => i !== tagIndex));
    };


    const onSearch = (event) => {
        setQuery(event.target.value);
        fetchQuery();
    }

    const onFilterChange = (event) => {
        setFilter({...filter, [event.target.name]: event.target.value});
    }

    useEffect(() => {
        fetchAds();
        fetchTagSuggestions();
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
                            tags={tags}
                            suggestions={tagSuggestions}
                            noSuggestionsText="No matching tags"
                            onAddition={onAddition}
                            onDelete={onDelete}
                        />
                        {/* <input 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            // value={''}
                            name="tags"
                            onChange={(event) => onFilterChange(event)}
                            placeholder="Tags" 
                            required
                        /> */}
                    </div>
                </div>
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
                    <thead className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                            Files
                        </th>
                        <th scope="col" className="py-3 px-3">
                            Tags
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
                                        {ad.files}
                                    </td>
                                    <td className="py-4 px-3">
                                        {ad.tags.map(t => t.name).join(', ')}
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