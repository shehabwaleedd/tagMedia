'use client'

import React, { useState, useEffect, useRef } from 'react';
import styles from './style.module.scss';
import { MdOutlineMail } from "react-icons/md";
import { IoIosRecording } from "react-icons/io";
import { FaRegGrinStars } from "react-icons/fa";
import { HiOutlinePhone, HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { BsLightning } from "react-icons/bs";

import getChars from "@/animation/animatedHeaders/getChars"


// Correctly type the icons array
const icons: React.ReactElement[] = [
    <IoIosRecording key="record" />,
    <HiOutlinePhone key="phone" />,
    <HiOutlineChatBubbleOvalLeftEllipsis key="chat" />,
    <MdOutlineMail key="email" />,
    <BsLightning key="lightning" />,
    <FaRegGrinStars key="grinStars" />
];


const ContactUpper = () => {
    const [currentIcon, setCurrentIcon] = useState<number>(0);


    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIcon(currentIcon => (currentIcon + 1) % icons.length);
        }, 700);
        return () => clearInterval(intervalId);
    }, []);



    return (
        <section className={styles.contactUpper_left}>
            <div className={styles.contactUpper_left_title}>
                <div>{getChars("NEED A FRESH")}</div>
                <div>{getChars("PERSPECTIVE?")}</div>
                <div>{icons[currentIcon]}</div>
            </div>
        </section>
    )
}

export default ContactUpper