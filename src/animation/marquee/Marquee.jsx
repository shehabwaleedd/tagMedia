'use client'
import React from 'react'
import './Marquee.css'
import Marquee from 'react-fast-marquee';

const Announcment = () => {
    return (
        <Marquee className='marquee' gradient={false} speed={100} pauseOnHover={true}>
            <h3>
                Dare to be the best!
            </h3>
            <h3>
                Dare to be the best!
            </h3>
        </Marquee>
    )
}

export default Announcment
