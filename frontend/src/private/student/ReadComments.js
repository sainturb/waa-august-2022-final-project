import React, {useState} from "react";
import axios from "axios";

function ReadComments ({student}) {
    const [dialog, setDialog] = useState(false);
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');

    const fetch = () => {
        axios.get('/api/comments/' + student.id).then(response => {
            if (response.data) {
                setComments(response.data)
            }
        });
    }
    const onRead = () => {
        showDialog();
        fetch();
    }

    const addComment = () => {
        const body = {content, student}
        axios.post('/api/comments', body).then(response => {
            if (response.data) {
                setContent('');
                fetch();
            }
        });
    }

    const showDialog = () => {
        setDialog(true)
    }

    const hideDialog = () => {
        setDialog(false)
    }

    return (
        <>
            <button className="font-medium  ml-2 text-blue-600 dark:text-blue-500 hover:underline" onClick={(event) => onRead()}>Read</button>
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
                                                    id="modal-title">Comments</h3>
                                                <div className="mt-2 relative">
                                                    <div className="mb-2">
                                                        <textarea placeholder="New comment"
                                                                  value={content}
                                                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                  onChange={(event) => setContent(event.target.value)}
                                                        ></textarea>
                                                        <button
                                                            onClick={() => addComment()}
                                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-2 sm:w-auto sm:text-sm">Send
                                                        </button>
                                                    </div>
                                                    <table className=" text-sm text-left text-gray-500 dark:text-gray-400">
                                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                        <tr>
                                                            <th scope="col" className="py-3 px-2">
                                                                Student
                                                            </th>
                                                            <th scope="col" className="py-3 px-2 w">
                                                                Comment
                                                            </th>
                                                            <th scope="col" className="py-3 px-2">
                                                                Written by
                                                            </th>
                                                            <th scope="col" className="py-3 px-2">
                                                                Written date
                                                            </th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {
                                                            comments.map(record => {
                                                                return (
                                                                    <tr key={record.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                                        <td className="p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                            {record.student.firstName}
                                                                        </td>
                                                                        <td className="p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                            {record.content}
                                                                        </td>
                                                                        <td className="p-2">
                                                                            {record.createdBy}
                                                                        </td>
                                                                        <td className="p-2">
                                                                            {record.createdDate}
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
        </>
    )
}

export default ReadComments;