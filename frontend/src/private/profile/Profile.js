import React, {useEffect, useState} from 'react';
import {useAuth} from "../../App";
import axios from "axios";

function Profile() {
    const auth = useAuth();
    const [message, setMessage] = useState(null);
    const [user, setUser] = useState({
        id: null,
        personType: auth.user.personType,
        firstName: auth.user.firstName,
        lastname: auth.user.lastname,
        email: auth.user.email,
        userId: auth.user.id,
        active: true
    });

    const onChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value})
    }

    const onSave = (event) => {
        event.preventDefault();
        const response = axios.post(`/api/users/${user.personType}`, user);
        if (response) {
            setUser({...user, id: response.id});
            console.log('data');
            setMessage('Information is updated successfully');
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        }
    }

    const getUser = () => {
        axios.get(`/api/users/${user.personType}/${user.userId}`).then(response => {
            if (response.data) {
                setUser({...user, id: response.data.id});
            }
        });
    }
    useEffect(() => {
        getUser();
    }, [])

    return (
        <div>
            <div className="text-xl font-bold mb-2">Profile</div>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <form className="p-4" onSubmit={(event) => onSave(event)}>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div className="mb-6">
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Are you
                                ?</label>
                            <select name={'personType'}
                                    value={user.personType}
                                    onChange={(event) => onChange(event)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option>Choose who you are</option>
                                <option value="admin">Admin</option>
                                <option value="faculty">Faculty</option>
                                <option value="student">Student</option>
                            </select>
                        </div>
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                            <input type="email"
                                   value={user.email}
                                   name={'email'}
                                   onChange={(event) => onChange(event)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Email" required/>
                        </div>
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First
                                name</label>
                            <input type="text"
                                   value={user.firstName}
                                   name={'firstName'}
                                   onChange={(event) => onChange(event)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Firstname" required/>
                        </div>
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last
                                name</label>
                            <input type="text"
                                   name={'lastname'}
                                   value={user.lastname}
                                   onChange={(event) => onChange(event)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Lastname" required/>
                        </div>

                    </div>
                    <button type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save
                        information
                    </button>

                    {
                        message ? <span className="ml-2 text-sm text-green-600 dark:text-green-500">{message}</span> : ''
                    }
                </form>
            </div>
        </div>
    )
}

export default Profile;