import React, {useEffect, useState} from 'react';
import axios from "axios";
import CreateAdDialog from "./CreateAdDialog";

function MyAds () {
    const [ads, setAds] = useState([]);

    const fetch = () => {
        axios.get(`/api/advertisements/my`).then(response => {
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
            <div className="text-xl font-bold mb-2">My Advertisements</div>
            <CreateAdDialog fetch={fetch} buttonText={'Create your own Ad'} />
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
                                        {ad.files}
                                    </td>
                                    <td className="py-4 px-3">
                                        {ad.tags ? ad.tags.map(t => {
                                            return (<span key={t.id} className={'ml-4 mb-1 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 border'}>{t.name}</span>)
                                        }) : 'Empty'}
                                    </td>
                                    <td className="py-4 px-6">
                                        <CreateAdDialog
                                            fetch={fetch}
                                            editBody={ad}
                                            buttonText={'edit'}
                                            />
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

export default MyAds;