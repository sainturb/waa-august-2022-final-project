import React from 'react';
import {Link, Route, Routes} from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Student from "./student/Student";
import Faculty from "./faculty/Faculty";
import Ads from "./ads/Ads";
import History from "./history/History";
import {useAuth} from "../App";
import Profile from "./profile/Profile";
import Search from "./search/Search";
import axios from "axios";

function Private () {
    const auth = useAuth();
    const logout = () => {
        auth.redirectSignOut();
    }
    axios.interceptors.response.use(
        response => response,
        error => {
            const {status} = error.response;
            if (status === 401) {
                logout();
            }
            return Promise.reject(error);
        }
    );
    return (
        <>
            <div className="container mx-auto">
                <div className="flex flex-row flex-wrap py-4">
                    <aside className="w-full sm:w-1/3 md:w-1/4 px-2">
                        <div className="sticky top-0 p-4 w-full">
                            <ul className="flex flex-col overflow-hidden">
                                <li className="rounded-md hover:bg-slate-100 pl-4 pr-4 pt-1 pb-1 w-fit">
                                    <Link to={'/'} >Home </Link>
                                </li>
                                <li className="rounded-md hover:bg-slate-100 pl-4 pr-4 pt-1 pb-1 w-fit">
                                    <Link to={'profile'} >Profile</Link>
                                </li>
                                <li className="rounded-md hover:bg-slate-100 pl-4 pr-4 pt-1 pb-1 w-fit">
                                    <Link to={'search'} >Search Job</Link>
                                </li>
                                <li className="rounded-md hover:bg-slate-100 pl-4 pr-4 pt-1 pb-1 w-fit">
                                    <Link to={'student'} >Students</Link>
                                </li>
                                <li className="rounded-md hover:bg-slate-100 pl-4 pr-4 pt-1 pb-1 w-fit">
                                    <Link to={'faculty'} >Faculty</Link>
                                </li>
                                <li className="rounded-md hover:bg-slate-100 pl-4 pr-4 pt-1 pb-1 w-fit">
                                    <Link to={'ads'} >Ads</Link>
                                </li>
                                <li className="rounded-md hover:bg-slate-100 pl-4 pr-4 pt-1 pb-1 w-fit">
                                    <Link to={'history'} >History</Link>
                                </li>
                                <br/>
                                <li className="rounded-md hover:bg-red-50 pl-4 pr-4 pt-1 pb-1 w-fit">
                                    <button className={''} onClick={() => logout()}>Logout</button>
                                </li>
                            </ul>
                        </div>
                    </aside>
                    <main role="main" className="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
                        <Routes>
                            <Route path={'/'} element={<Dashboard />}></Route>
                            <Route path={'search'} element={<Search />}></Route>
                            <Route path={'profile'} element={<Profile />}></Route>
                            <Route path={'student'} element={<Student />}></Route>
                            <Route path={'faculty'} element={<Faculty />}></Route>
                            <Route path={'ads'} element={<Ads />}></Route>
                            <Route path={'history'} element={<History />}></Route>
                        </Routes>
                    </main>
                </div>
            </div>
            {/*<footer className="mt-auto">*/}
            {/*    footer*/}
            {/*</footer>*/}
        </>
    )
}

export default Private;

