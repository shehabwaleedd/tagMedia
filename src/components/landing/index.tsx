import dynamic from 'next/dynamic';
import React from 'react';
import styles from './style.module.scss';
const Icons = dynamic(() => import('../icons'), { ssr: false });

const Landing: React.FC = () => {
    return (
        <section className={styles.landing}>
            <div className={styles.landing__content}>
                <div className={styles.left}>
                    <h2>Crafting</h2>
                </div>
                <div className={styles.middle}>
                    <h2>Tomorrow&apos;s</h2>
                </div>
                <div className={styles.right}>
                    <h2>Markets, <span className={styles.middle}>Now!</span></h2>
                </div>
                <Icons />
            </div>

        </section>
    );
};

export default Landing;
