import React from 'react'
import Navbar from '@/pages/layout/Navbar';

export default ({ children }) => {
    return (
        <>
            <Navbar />
            <div className="container">
                <div>{children}</div>
            </div>
        </>
    );
}

