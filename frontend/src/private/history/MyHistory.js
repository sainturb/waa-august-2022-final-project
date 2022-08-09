import React, {useEffect, useState} from 'react';
import axios from "axios";
import CreateHistoryDialog from "./CreateHistoryDialog";

function MyHistory () {
    const [history, setHistory] = useState([]);
    const fetch = () => {
        axios.get(`/api/histories/my`).then(response => {
            if (response.data) {
                setHistory(response.data);
            }
        });
    }
    useEffect(() => {
        fetch();
    }, [])
    return (
        <div>
            <div className="text-xl font-bold mb-2">Job History</div>
            <CreateHistoryDialog fetch={fetch} />
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
                            Comments
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
                                        {record.comments.length}
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

export default MyHistory;