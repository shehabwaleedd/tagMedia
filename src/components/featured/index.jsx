'use client'
import React, { useState, useEffect } from 'react';
import styles from "./style.module.scss"
import Image from 'next/image'
import RoundedButton from '@/animation/RoundedButton'
import { motion } from 'framer-motion';

const Projects = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [hoveredProject, setHoveredProject] = useState(null);


    const data = [
        {
            name: "Azmet Montasaf El3omr",
            image: "/assets/featured/Azma.webp",
            role: "Social Media Management",
            year: "2021"
        },
        {
            name: "Al Da7ek Al Baki",
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
            name: "Btlou3 Al Rou7",
            image: "/assets/featured/Rouh.webp",
            role: "Social Media Management",
            year: "2022"
        }
    ]
    const miniServices = [
        {
            name: "Content Creation",
        },
        {
            name: "Marketing Strategy"
        },
        {
            name: "Branding"
        },
        {
            name: "Media Production"
        },
        {
            name: "Community Management"
        },
        {
            name: "Influencer Management"
        },
        {
            name: "Media Buying"
        },
    ]

    return (

        <motion.section className={styles.featured}>
            <div className={styles.featured__container}>
                {data.map((item, index) => (
                    <motion.div key={index}
                        className={styles.featured__item}
                        onMouseEnter={() => setHoveredProject(index)}
                        onMouseLeave={() => setHoveredProject(null)}>
                        <Image src={item.image} alt={item.name} width={500} height={500}
                            style={{
                                filter: hoveredProject === index || hoveredProject === null ? "" : "grayscale(100%)"
                            }}
                        />
                        <div className={styles.featured__item__content}>
                            <h3>{item.name}</h3>
                            <p>{item.role}</p>
                            <p>{item.year}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className={styles.featured__miniServices}>
                <div className={styles.featured__miniServices__container}>
                    {miniServices.map((item, index) => (
                        <RoundedButton key={index}>
                            <p>{item.name}</p>
                        </RoundedButton>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}

export default Projects