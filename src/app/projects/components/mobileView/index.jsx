import React from 'react'
import Image from 'next/image';
import styles from "../../page.module.scss"

const index = ({ projects, handleProjectClick }) => {
    return (
        <div className={styles.slider_mobile}>
            <div className={styles.slider_mobile_wrapper}>
                {projects.map((project, index) => (
                    <article key={index} className={styles.slider_mobile_wrapper_slide} onClick={() => handleProjectClick(index)}>
                        <div className={styles.slider_mobile_wrapper_slide_image}>
                            <Image src={project.image} alt={project.name} width={500} height={500} quality={100} />
                        </div>
                        <div className={styles.slider_mobile_wrapper_slide_content}>
                            <h3>{project.name}</h3>
                            <p>{project.role}</p>
                            <p>{project.year}</p>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    )
}

export default index