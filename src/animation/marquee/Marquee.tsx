'use client'
import React from 'react'
import './Marquee.scss'
import Marquee from 'react-fast-marquee';

const Announcment = () => {
    return (
        <Marquee className='marquee' gradient={false} speed={100}>
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
