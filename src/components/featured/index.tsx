'use client'
import React, { useRef } from 'react';
import styles from "./style.module.scss"
import RoundedButton from '@/animation/RoundedButton'
import ProjectsHomePage from '@/components/projects';
import { useScroll, motion, useTransform } from 'framer-motion';

const Projects = ({ work }: {
    work: {
        name: string;
        image: {
            url: string;
        };
        role: string;
        year: string;
    }[];
}) => {

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

    const container = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["end start", "end center"]
    });
    const y = useTransform(scrollYProgress, [0, 1], [400, 0]);


    return (

        <motion.section className={styles.featured}>
            {/* <h2> Our Projects </h2> */}
            <ProjectsHomePage work={work} />
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