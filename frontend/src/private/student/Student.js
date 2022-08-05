import React, {useEffect, useState} from 'react';
import axios from "axios";

function Student () {
    const [students, setStudents] = useState([]);
    const fetch = () => {
        axios.get(`/api/students`).then(response => {
            if (response.data) {
                setStudents(response.data);
            }
        });
    }
    useEffect(() => {
        fetch();
    }, [])
    return (
        <>
            <div className="text-xl font-bold mb-2">Students</div>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Firstname
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Lastname
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Email
                        </th>
                        <th scope="col" className="py-3 px-6">
                            GPA
                        </th>
                        <th scope="col" className="py-3 px-6">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        students.map(student => {
                            return (
                                <tr key={student.userId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {student.firstName}
                                    </th>
                                    <td className="py-4 px-6">
                                        {student.lastname}
                                    </td>
                                    <td className="py-4 px-6">
                                        {student.email}
                                    </td>
                                    <td className="py-4 px-6">
                                        {student.gpa}
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Student;