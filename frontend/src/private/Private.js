import React, {useEffect, useState} from 'react';
import {Link, Route, Routes} from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Student from "./student/Student";
import Faculty from "./faculty/Faculty";
import Ads from "./ads/Ads";
import History from "./history/History";
import {useAuth} from "../App";
import Profile from "./profile/Profile";
import NotFound from "../public/NotFound";
import axios from "axios";
import Navbar from '../public/Navbar';
import MyHistory from "./history/MyHistory";
import MyAds from "./ads/MyAds";
import AppliedStudents from "./ads/AppliedStudents";
import Notification from "./notification/Notification";

function Private() {
    const [titleState, setTitleState] = useState('Default Title');
    const auth = useAuth();
    const logout = () => {
        auth.redirectSignOut();
    }
    axios.interceptors.response.use(
        response => response,
        error => {
            const {status} = error.response;
            if (status === 401) {
                auth.redirectSignIn();
            } else if (error.response.status === 403) {
                alert('You don\'t have any access to see this information');
            } else {

            }
            return Promise.reject(error);
        }
    );

    const logoutBtn = (
        <button className='rounded-md bg-white text-black hover:bg-red-50 active:bg-red-100 w-24 h-8 mt-2'
                onClick={() => logout()}>Logout</button>);

    useEffect(() => {

    }, []);



    return (
        <>
            <div className="container mx-auto">
                <Notification/>
                <Navbar title={titleState} navLeft={logoutBtn}/>
                <div className="flex flex-row flex-wrap py-4">
                    <aside className="w-full sm:w-1/4 md:w-1/6 px-2">
                        <div className="sticky top-0 p-4 w-full">
                            <ul className="flex flex-col overflow-hidden">
                                <li className="rounded-md hover:bg-slate-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 pl-4 pr-4 pt-1 pb-1 w-fit">
                                    <Link to={'/'}>Home </Link>
                                </li>
                                <li className="rounded-md hover:bg-slate-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 pl-4 pr-4 pt-1 pb-1 w-fit">
                                    <Link to={'profile'}>Profile</Link>
                                </li>
                                <li className="rounded-md hover:bg-slate-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 pl-4 pr-4 pt-1 pb-1 w-fit">
                                    <Link to={'my-jobs'}>My Jobs</Link>
                                </li>
                                <li className="rounded-md hover:bg-slate-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 pl-4 pr-4 pt-1 pb-1 w-fit">
                                    <Link to={'my-ads'}>My Ads</Link>
                                </li>
                                <li className="rounded-md hover:bg-slate-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 pl-4 pr-4 pt-1 pb-1 w-fit">
                                    <Link to={'student'}>Students</Link>
                                </li>
                                <li className="rounded-md hover:bg-slate-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 pl-4 pr-4 pt-1 pb-1 w-fit">
                                    <Link to={'faculty'}>Faculty</Link>
                                </li>
                                <li className="rounded-md hover:bg-slate-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 pl-4 pr-4 pt-1 pb-1 w-fit">
                                    <Link to={'ads'}>Ads</Link>
                                </li>
                                <li className="rounded-md hover:bg-slate-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 pl-4 pr-4 pt-1 pb-1 w-fit">
                                    <Link to={'history'}>History</Link>
                                </li>
                            </ul>
                        </div>
                    </aside>
                    <main role="main" className="w-full sm:w-3/4 md:w-5/6 pt-1 px-2">
                        <Routes>
                            <Route path={'/'} element={<Dashboard/>}></Route>
                            <Route path={'profile'} element={<Profile/>}></Route>
                            <Route path={'my-jobs'} element={<MyHistory/>}></Route>
                            <Route path={'my-ads'} element={<MyAds/>}></Route>
                            <Route path={'applied-students/:id'} element={<AppliedStudents/>}></Route>
                            <Route path={'student'} element={<Student/>}></Route>
                            <Route path={'faculty'} element={<Faculty/>}></Route>
                            <Route path={'ads'} element={<Ads/>}></Route>
                            <Route path={'history'} element={<History/>}></Route>
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Private;

