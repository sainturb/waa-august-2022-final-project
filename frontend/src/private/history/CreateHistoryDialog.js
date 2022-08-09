import React, {useEffect, useState} from 'react';
import axios from "axios";

function CreateHistoryDialog({buttonText, fetch, editBody}) {
    const [body, setBody] = useState(editBody ? editBody : {companyName: '', startDate: '', endDate: '', reasonToLeave: ''});
    const [dialog, setDialog] = useState(false);
    const showDialog = (event) => {
        event.preventDefault();
        setDialog(true);
    }
    const hideDialog = () => {
        setDialog(false);
    }
    const onChange = (event) => {
        setBody({...body, [event.target.name]: event.target.value})
    }
    const save = (event) => {
        event.preventDefault();
        body.startDate = new Date(body.endDate);
        body.endDate = new Date(body.endDate);
        axios.post('/api/histories', body).then(response => {
            console.log(body);
            hideDialog();
            fetch();
        });
    }
    useEffect(() => {

    }, [])


    return (
        <div className="mb-2">
            <button type="button"
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={(event) => showDialog(event)}>
                {buttonText}
            </button>

            {
                dialog ?
                    (
                        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity"></div>

                            <div className="fixed z-10 inset-0 overflow-y-auto">
                                <div
                                    className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                                    <div
                                        className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                            <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                                <h3 className="text-lg leading-6 font-medium text-gray-900"
                                                    id="modal-title">Job history</h3>
                                                <div className="mt-2">
                                                    <div className="grid gap-6 mb-6 md:grid-cols-1">
                                                        <div>
                                                            <input type="text"
                                                                   value={body.companyName}
                                                                   name={'companyName'}
                                                                   onChange={(event) => onChange(event)}
                                                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                   placeholder="Company name" required/>
                                                        </div>
                                                        <div>
                                                            <label>Started date</label>
                                                            <input type="date"
                                                                   value={body.startDate}
                                                                   name={'startDate'}
                                                                   onChange={(event) => onChange(event)}
                                                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                   placeholder="Start date after" required/>
                                                        </div>

                                                        <div>
                                                            <label>Ended date</label>
                                                            <input type="date"
                                                                   value={body.endDate}
                                                                   name={'endDate'}
                                                                   onChange={(event) => onChange(event)}
                                                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                   placeholder="End date before" required/>
                                                        </div>
                                                        <div>
                                                            <textarea
                                                                value={body.reasonToLeave}
                                                                name={'reasonToLeave'}
                                                                onChange={(event) => onChange(event)}
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                placeholder="Reason to leave if you have one">
                                                            </textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                            <button type="button"
                                                    onClick={(event) => save(event)}
                                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">Save
                                            </button>
                                            <button type="button"
                                                    onClick={(event) => hideDialog()}
                                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel
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

export default CreateHistoryDialog;
