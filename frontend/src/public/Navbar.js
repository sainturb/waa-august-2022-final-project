import React from 'react';
import logo from '../logo.svg'
function Navbar(props) {

    return ( 
        <nav className='relative h-14 pt-1 pb-1 pr-4 pl-4 bg-blue-900'>
            <div className='flex'>
                <div className='shrink-0'>
                    <img className='h-12 w-12' src={logo} alt='Logo'/>
                </div>
                <div className='grow w-auto text-center'>
                    <p className='w-auto h-12 mt-auto text-center text-2xl pt-2 text-white'>{props.title}</p>
                </div>
                <div className='shrink-0 min-w-min'>
                    {props.navLeft}
                </div>
            </div>
        </nav> 
    );
}

export default Navbar;