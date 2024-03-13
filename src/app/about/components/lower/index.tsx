'use client'
import React from 'react'
import styles from "./style.module.scss"

const AboutLower: React.FC = () => {
    return (
        <section className={styles.aboutLower}>
            <div className={styles.aboutLower_left}>
                <h3>
                    Tag Media: Egypt&apos;s Pioneer in Digital and Influencer Marketing
                </h3>
            </div>
            <div className={styles.aboutLower_right}>
                <p>
                    As Egypt&apos;s pioneering digital marketing and influencer marketing agency, Tag Media stands at the forefront of the industry. Our dedication to pushing the boundaries of digital strategy has positioned us as one of the top agencies in Egypt.
                </p>
                <p>
                    Our mission at Tag Media is to foster brand growth and transformation. We empower our clients by unveiling new opportunities to navigate through evolving markets, optimize supply chains, and prepare for the future with innovative solutions.
                </p>
                <p>
                    Growth, to us, signifies more than an increase in sales; it represents building a deeper connection with your audience and aligning with their values, especially concerning vital societal and environmental topics. At Tag Media, we leverage cutting-edge strategies and creative excellence to ensure your brand remains relevant and continues to thrive.
                </p>
            </div>
        </section>
    )
}

export default AboutLower