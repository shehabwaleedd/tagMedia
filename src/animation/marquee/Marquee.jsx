'use client'
import React from 'react'
import './Marquee.css'
import Marquee from 'react-fast-marquee';

const Announcment = () => {
    return (
        <Marquee className='marquee' gradient={false} speed={50} pauseOnHover={true}>
            <div className="marquee-content">
                <h3>
                    Dare to be the best! 
                </h3>
            </div>
        </Marquee>
    )
}

export default Announcment
