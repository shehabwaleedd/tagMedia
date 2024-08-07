import React from 'react';
import styles from "./style.module.scss"
import MiniServices from '../miniServices'
const Brief = () => {

    return (
        <section className={styles.brief}>
            <div className={styles.content}>
                <h2 className={styles.brief__title}>Tag Media</h2>
                <span>
                    We are one of the marketing and creative consultancy agencies in Egypt and the Middle East. We work closely with our partners to manage their publicity and social media presence. We build awareness campaigns for our clients that drive more traffic and engagement.
                </span>
                <MiniServices />
            </div>
        </section>
    )
}

export default Brief