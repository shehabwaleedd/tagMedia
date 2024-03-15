'use client'
import React, { useRef} from 'react';
import styles from "./style.module.scss";
import Link from 'next/link';
import Image from 'next/image';
import { useScroll, useTransform, motion } from 'framer-motion';
import useWindowWidth from '@/hooks/useWindowWidth';
import RoundedButton from '@/animation/RoundedButton';

export const data = [
    {
        name: "Azmet Montasaf Al 'omr",
        image: "/assets/featured/Azma.webp",
        role: "Social Media Management",
        year: "2021"
    },
    {
        name: "Al Dahek Al Baki",
        image: "/assets/featured/Baki.webp",
        role: "Social Media Management",
        year: "2023"
    },
    {
        name: "Al Aghar",
        image: "/assets/featured/Aghar.webp",
        role: "Social Media Management",
        year: "2023"
    },
    {
        name: "Btlou' Al Rouh",
        image: "/assets/featured/Rouh.webp",
        role: "Social Media Management",
        year: "2022"
    }
]

const ServiceItem = ({ service, index }) => {
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth < 768;
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], ['10vh', '-5vh']);


    return (
        <motion.div className={`${styles.ourProjects__bottom_container} ${index % 2 !== 0 ? styles.reverse : ''}`} key={index} ref={ref}>
            <motion.div className={styles.ourProjects__bottom_container_image} style={{ alignContent: isMobile ? "center" : index % 2 !== 0 ? "left" : "right" }}>
                <Image src={service.image} width={800} height={800} alt={service.title} placeholder='blur' blurDataURL={service.image} />
            </motion.div>
            <motion.div className={styles.ourProjects__bottom_container_btns} style={{ y: !isMobile ? y : 0, alignItems: isMobile ? "flex-start" : index % 2 !== 0 ? "flex-start" : "flex-end" }}>
                <span>{service.year}</span>
                <h3 style={{ textAlign: isMobile ? "center" : index % 2 !== 0 ? "left" : "right" }}>{service.name}</h3>
                <div className={styles.ourProjects__bottom_container_btns_lower} style={{ alignItems: isMobile ? "flex-start" : index % 2 !== 0 ? "flex-start" : "flex-end" }}>
                    <p>{service.role}</p>
                    <div>
                        <RoundedButton>
                            <Link href="/services">Explore More</Link>
                        </RoundedButton>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}


const ServicesHomePage = () => {

    return (
        <section className={styles.ourProjects} >
            <div className={styles.ourProjects__bottom}>
                {data.map((service, index) => (
                    <ServiceItem service={service} index={index} key={index} />
                ))}
            </div>
        </section>
    );
}

export default ServicesHomePage;
