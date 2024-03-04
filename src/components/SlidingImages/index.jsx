'use client'
import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import styles from './style.module.scss';
import Image from 'next/image';


const slider1 = [
    {
        src: "/assets/stars/AHMED ZAHER.png"
    },
    {
        src: "/assets/stars/AMR ABDULGLIL.png"

    },
    {
        src: "/assets/stars/AMR SAAD.png"
    },
    {
        src: "/assets/stars/CAROLINE AZMY.png"
    },
    {
        src: "/assets/stars/DINA FOAAD.png"
    },
    {
        src: "/assets/stars/HANY SHAKER.png"
    },
    {
        src: "/assets/stars/HASSAN ELRADDAD.png"
    },
    {
        src: "/assets/stars/MAI OMAR.png"
    }
]


export default function ImagesSlider() {

    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    })

    const x1 = useTransform(scrollYProgress, [0, 1], ['50vw', '-100vw'])

    return (
        <div ref={container} className={styles.slidingImages}>
            <h2> Our Stars </h2>
            <motion.div style={{ x: x1 }} className={styles.slider}>
                {
                    slider1.map((project, index) => {
                        return <div key={index} className={styles.project} >
                            <div className={styles.imageContainer}>
                                <Image
                                    fill={true}
                                    alt={"image"}
                                    src={project.src} />
                            </div>
                        </div>
                    })
                }
            </motion.div>
        </div>
    )
}
