import React, {useEffect, useState} from 'react';
import axios from "axios";

function CVDialog({student}) {
    const [dialog, setDialog] = useState(false);
    const [history, setHistory] = useState([]);
    const showDialog = (event) => {
        event.preventDefault();
        setDialog(true);
    }
    const hideDialog = () => {
        setDialog(false);
    }
    useEffect(() => {
        axios.get(`/api/histories/list/by-user-id/${student.userId}`).then(response => {
           if (response.data) {
               setHistory(response.data);
           }
        });
    }, [])

    return (
        <div className="mb-2">
            <button type="button"
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={(event) => showDialog(event)}>
                Show CV
            </button>

            {
                dialog ?
                    (
                        <div className="relative z-10 " aria-labelledby="modal-title" role="dialog" aria-modal="true">
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity"></div>

                            <div className="fixed z-10 inset-0 overflow-y-auto ">
                                <div
                                    className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                                    <div
                                        className="relative bg-white dark:bg-slate-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                                        <div className="bg-white dark:bg-slate-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                            <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                                                    id="modal-title">Job history</h3>
                                                <div className="mt-2 relative">
                                                    <table className=" text-sm text-left text-gray-500 dark:text-gray-400">
                                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                        <tr>
                                                            <th scope="col" className="py-3 px-2 w">
                                                                Company Name
                                                            </th>
                                                            <th scope="col" className="py-3 px-2">
                                                                Started
                                                            </th>
                                                            <th scope="col" className="py-3 px-2">
                                                                Ended
                                                            </th>
                                                            <th scope="col" className="py-3 px-2">
                                                                Reason for leaving
                                                            </th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {
                                                            history.map(record => {
                                                                return (
                                                                    <tr key={record.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                                        <th scope="row" className="p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                            {record.companyName}
                                                                        </th>
                                                                        <td className="p-2">
                                                                            {record.startDate}
                                                                        </td>
                                                                        <td className="p-2">
                                                                            {record.endDate}
                                                                        </td>
                                                                        <td className="p-2">
                                                                            {record.reasonToLeave}
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-slate-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                            <button type="button"
                                                    onClick={(event) => hideDialog()}
                                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Dismiss
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    : <></>
            }
        </div>
    )
}

export default CVDialog;
