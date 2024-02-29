import React from 'react'
import './Marquee.css'

const Marquee = () => {
    return (
        <div className='marquee'>
            <div className="marquee__container containered">
                <h3>
                    <div className="marquee-wrapper">
                        <div className="marquee-title">
                            Elevating <span className="text-stroke-black">Women&apos;s Health </span>
                            &amp;
                            / Empowering <span className="text-stroke-black">Personal Development </span>
                            &amp;
                            / Unleashing <span className="text-stroke-black">Career Growth </span>
                            &amp;
                        </div>
                    </div>
                </h3>
            </div>
        </div>
    )
}

export default Marquee
