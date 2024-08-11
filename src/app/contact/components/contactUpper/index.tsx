import React from 'react';
import styles from './style.module.scss';


const ContactUpper = () => {

    return (
        <section className={styles.contactUpper_left}>
            <div className={styles.contactUpper_left_title}>
                <h2> Let&apos;s Grow </h2>
                <h2 className={styles.accent}> Together </h2>
            </div>
        </section>
    )
}

export default ContactUpper