import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux'

import { fetchAds, fetchStudents } from '../../redux/dash-reducer';

import AdLoc from './AdState';
import StudentState from './StudentState';
import AdTag from './AdTag';
import StudentGPA from './StudentGPA';
import Scatter from './Scatter';
import AdSalaryTag from './AdSalaryTag';

function Dashboard () {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAds());
        dispatch(fetchStudents());
    }, []);

    return (
        <div>
            <div className="text-xl font-bold mb-2">Dashboard</div>
            <div>
                <div className='flex flex-col'>
                    <div className='flex'>
                        <div className='w-full md:w-1/3 border border-gray-300'>
                            <StudentGPA />
                        </div>
                        <div className='w-full md:w-1/3 border border-gray-300'>
                            <StudentState />
                        </div>
                        <div className='w-full md:w-1/3 border border-gray-300'>
                            <Scatter />
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='w-full md:w-1/3 border border-gray-300'>
                            <AdLoc />
                        </div>
                        <div className='w-full md:w-1/3 border border-gray-300'>
                            <AdTag />
                        </div>
                        <div className='w-full md:w-1/3 border border-gray-300'>
                            <AdSalaryTag />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Dashboard;