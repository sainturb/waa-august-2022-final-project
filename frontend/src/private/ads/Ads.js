import React, {useEffect, useState} from 'react';
import axios from "axios";

function Ads () {
    const [ads, setAds] = useState([]);
    const fetch = () => {
        axios.get(`/api/advertisements`).then(response => {
            if (response.data) {
                setAds(response.data);
            }
        });
    }
    useEffect(() => {
        fetch();
    }, [])
    return (
        <div>
            <div className="text-xl font-bold mb-2">Advertisements</div>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Description
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Benefits
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Files
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Tags
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        ads.map(ad => {
                            return (
                                <tr key={ad.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {ad.description}
                                    </th>
                                    <td className="py-4 px-6">
                                        {ad.benefits}
                                    </td>
                                    <td className="py-4 px-6">
                                        {ad.files}
                                    </td>
                                    <td className="py-4 px-6">
                                        {ad.tags}
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

export default Ads;