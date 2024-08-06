'use client'

import React  from 'react';
import styles from './style.module.scss';
import getChars from "@/animation/animatedHeaders/getChars"
import Icons from '@/components/icons';


const ContactUpper = () => {

    return (
        <section className={styles.contactUpper_left}>
            <div className={styles.contactUpper_left_title}>
                <div>{getChars("Need A Fresh")}</div>
                <div>{getChars("Perspective?")}</div>
                <Icons />
            </div>
        </section>
    )
}

export default ContactUpper