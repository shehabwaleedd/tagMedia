import React from 'react'
import styles from './style.module.scss'
import Marquee from 'react-fast-marquee';
import Image from 'next/image';
import { serverDynamicFetch } from '@/lib/serverDynamicFetch';



export default async function Announcment({
    content, direction, title
}: {
    content: any,
    direction: any,
    title?: string,
}) {
    const defaultPartners = await serverDynamicFetch('partner');

    if (!defaultPartners) {
        return null;
    }

    return (
        <div className={styles.marquee}>
            {title && <h2>{title}</h2>}
            <Marquee gradient={false} speed={50} pauseOnHover={true} direction={direction}>
                {content}
            </Marquee>
        </div>
    )
}

