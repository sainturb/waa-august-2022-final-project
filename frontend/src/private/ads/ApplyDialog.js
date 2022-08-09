import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useAuth} from "../../App";

function ApplyDialog({ad, fetch}) {
    const auth = useAuth();
    const [dialog, setDialog] = useState(false);
    const [body, setBody] = useState({
        id: null,
        type: auth.user.type,
        firstName: auth.user.firstName,
        lastname: auth.user.lastname,
        email: auth.user.email,
        userId: auth.user.userId,
        city: '',
        address: '',
        state: '',
        zipCode: '',
        active: true,
    } );

    const showDialog = () => {
        setDialog(true);
    }

    const hideDialog = () => {
        setDialog(false);
    }

    const save = (event) => {
        event.preventDefault();
        axios.post(`/api/advertisements/apply/${ad.id}`, body).then(response => {
            fetch();
            hideDialog();
        });
    }
    useEffect(() => {
        axios.get(`/api/users/${body.type}/${body.userId}`).then(response => {
            if (response.data) {
                setBody({
                    ...body,
                    id: response.data.id,
                    zipCode: response.data.zipCode,
                    address: response.data.address,
                    state: response.data.state,
                    city: response.data.city,
                    gpa: response.data.gpa,
                    major: response.data.major
                });
            }
        });
    }, [])


    return (
        <div className="mb-2">
            <button type="button"
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={(event) => showDialog(event)}>
                Apply
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
                                                    id="modal-title">Apply as</h3>
                                                <div className="mt-5">
                                                    <div className="grid gap-6 mb-1 md:grid-cols-1">
                                                        <div>
                                                            <label className="font-medium">Full name: </label>{body.firstName} {body.lastname}
                                                        </div>
                                                        <div>
                                                            <label className="font-medium">Email: </label>{body.email}
                                                        </div>
                                                        <div>
                                                            <label className="font-medium">For: </label>{ad.title}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                            <button type="button"
                                                    onClick={(event) => save(event)}
                                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">Apply
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

export default ApplyDialog;
