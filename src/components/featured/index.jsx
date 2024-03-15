'use client'
import React, { useState, useEffect } from 'react';
import styles from "./style.module.scss"
import Image from 'next/image'
import RoundedButton from '@/animation/RoundedButton'
import { motion } from 'framer-motion';
import ServicesHomePage from '@/components/services';

const Projects = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [hoveredProject, setHoveredProject] = useState(null);

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
            <h2> Our Projects </h2>
            <ServicesHomePage />
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