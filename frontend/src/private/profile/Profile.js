import React, {useEffect, useState} from 'react';
import {useAuth} from "../../App";
import axios from "axios";
import {STATES} from "../../constants/States";

function Profile() {
    const auth = useAuth();
    const states = STATES;
    const [message, setMessage] = useState(null);
    const [user, setUser] = useState({
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
        gpa: '',
        active: true,
        department: {},
        major: {},
    });
    const [departments, setDepartments] = useState([]);
    const onChange = (event) => {
        if (event.target.name === 'major' || event.target.name === 'department') {
            setUser({...user, [event.target.name]: JSON.parse(event.target.value)})
        } else {
            setUser({...user, [event.target.name]: event.target.value})
        }
    }

    const onSave = (event) => {
        event.preventDefault();
        if (user.departmentId) {
            user.department = departments.find(d => d.id.toString() === user.departmentId);
        }
        if (user.majorId) {
            user.major = departments.find(d => d.id.toString() === user.majorId);
        }
        const response = axios.post(`/api/users/${user.type}`, user);
        if (response) {
            setUser({...user, id: response.id});
            setMessage('Information is updated successfully');
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        }
    }

    const getUser = () => {
        axios.get(`/api/departments`).then(response => {
            if (response.data) {
                setDepartments(response.data)
            }
        })
        if (user.type) {
            axios.get(`/api/users/${user.type}/${user.userId}`).then(response => {
                if (response.data) {
                    setUser({
                        ...user,
                        id: response.data.id,
                        zipCode: response.data.zipCode ? response.data.zipCode : '',
                        address: response.data.address ? response.data.address : '',
                        state: response.data.state ? response.data.state : '',
                        city: response.data.city ? response.data.city : '',
                        gpa: response.data.gpa ? response.data.gpa : 0,
                        departmentId: response.data.department ? response.data.department.id : undefined,
                        majorId: response.data.major ? response.data.major.id : undefined,
                    });
                }
            });
        }
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
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Are you
                                ?</label>
                            <select name={'type'}
                                    value={user.type}
                                    onChange={(event) => onChange(event)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option>Choose who you are</option>
                                <option value="admin">Admin</option>
                                <option value="faculty">Faculty</option>
                                <option value="student">Student</option>
                            </select>
                        </div>
                        <div>

                            {user.type === 'admin' ? '' :
                                user.type === 'faculty' ? (
                                    <>
                                        <label>Department</label>
                                        <select name={'departmentId'}
                                                value={user.departmentId}
                                                onChange={(event) => onChange(event)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option>Choose a department</option>
                                            {
                                                departments.map(d => {
                                                    return (
                                                        <option key={'dep' + d.id} value={d.id} >{d.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </>
                                ) : (
                                    <>
                                        <label>Major</label>
                                        <select name={'majorId'}
                                                value={user.majorId}
                                                onChange={(event) => onChange(event)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option>Choose a major</option>
                                            {
                                                departments.map(d => {
                                                    return (
                                                        <option key={'maj' + d.id} value={d.id}>{d.name}</option>
                                                    )
                                                })
                                            }
                                        </select></>
                                )
                            }
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
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Address</label>
                            <textarea name={'address'}
                                      value={user.address}
                                      onChange={(event) => onChange(event)}
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      placeholder="Address">
                            </textarea>
                        </div>
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">State</label>
                            <select name={'state'}
                                    value={user.state}
                                    onChange={(event) => onChange(event)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option>Choose the state</option>
                                {
                                    states.map(state => {
                                        return (
                                            <option key={state.name} value={state.abbreviation}>{state.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">City</label>
                            <input type="text"
                                   name={'city'}
                                   value={user.city}
                                   onChange={(event) => onChange(event)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="City" required/>
                        </div>
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Zip</label>
                            <input type="text"
                                   name={'zipCode'}
                                   value={user.zipCode}
                                   onChange={(event) => onChange(event)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Zip" required/>
                        </div>
                        {
                            user.type === 'student' ?
                                (
                                    <div>
                                        <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Zip</label>
                                        <input type="number"
                                               step="0.1"
                                               name={'gpa'}
                                               value={user.gpa}
                                               onChange={(event) => onChange(event)}
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               placeholder="GPA" required/>
                                    </div>
                                ) : ''
                        }
                    </div>
                    <button type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save
                        information
                    </button>

                    {
                        message ?
                            <span className="ml-2 text-sm text-green-600 dark:text-green-500">{message}</span> : ''
                    }
                </form>
            </div>
        </div>
    )
}

export default Profile;