'use client'
import React, { useState } from 'react'
import './Toggle.css'

const ToggleTheme = ({ toggleTheme }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
        setIsHovered(!isHovered);
    };

    return (
        <div className='toggleCircle'>
            <div
                className={`circle ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}
                onClick={toggleTheme}
            >
                <div className="half-circle blackcircle"></div>
                <div className="half-circle whitecircle"></div>
            </div>
        </div>
    )
}

export default ToggleTheme