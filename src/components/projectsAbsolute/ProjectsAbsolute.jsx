'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from "@/app/projects/page.module.scss"
import Image from 'next/image'

const ProjectsAbsolute = ({ projectState, relatedProjects, handleDetailsClose}) => {
    const [selectedMedia, setSelectedMedia] = useState({ type: null, src: null });
    const [isDrag, setIsDrag] = useState(false);

    const handleMediaClick = (type, src) => {
        if (!isDrag) {
            setSelectedMedia({ type, src });
        }
    };

    const handleDragStart = () => {
        setIsDrag(true); 
    };

    const handleDragEnd = () => {
        setTimeout(() => setIsDrag(false), 50);
    };




    return (
        <>
            <AnimatePresence mode='wait'>
                {projectState.detailsOpened && relatedProjects[projectState.selectedProjectIndex] && (
                    <motion.div className={styles.projectsPageCo__details} initial={{ y: 200 }} animate={{ y: 0 }} exit={{ y: 1000 }} >
                        <div className={styles.projectsPageCo__details__container__close} onClick={handleDetailsClose}>
                            <span>{relatedProjects[projectState.selectedProjectIndex].date}</span>
                            <h3>{relatedProjects[projectState.selectedProjectIndex].title}</h3>
                            <span>Close</span>
                        </div>
                        <div className={styles.projectsPageCo__deCo}>
                            <motion.div className={styles.projectsPageCo__details__container} drag="x" dragConstraints={{ left: -800, right: 800 }} dragElastic={1} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                                {relatedProjects[projectState.selectedProjectIndex].collectiveItems &&
                                    relatedProjects[projectState.selectedProjectIndex].collectiveItems
                                        .filter(item => item.type === 'projectImages')[0]?.items.map((detail, index) => (
                                            <div className={styles.projectsPageCo__details__container__item} key={index}>
                                                {detail.isImg ? (
                                                    <div className={styles.projectsPageCo__details__container__item__img} onClick={() => handleMediaClick('image', detail.image)}>
                                                        <Image src={detail.image} alt={`Project Img ${index}`} loading="lazy" height={500} width={500} quality={100}/>
                                                    </div>
                                                ) : (
                                                    <div className={styles.projectsPageCo__details__container__item__video} onClick={() => handleMediaClick('video', detail.image)}>
                                                        <video loading="lazy" src={detail.image} loop muted autoPlay playsInline alt={`Project Video ${index}`} />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {selectedMedia.src && (
                <motion.div className={styles.fullscreen_overlay} onClick={() => setSelectedMedia({ type: null, src: null })} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {selectedMedia.type === 'image' && (
                        <Image src={selectedMedia.src} alt="Full Screen" className="fullscreen-image" height={500} width={500} quality={100}/>
                    )}
                    {selectedMedia.type === 'video' && (
                        <video className={styles.fullscreen_video} src={selectedMedia.src} controls autoPlay loop />
                    )}
                </motion.div>
            )}

        </>
    )
}

export default ProjectsAbsolute