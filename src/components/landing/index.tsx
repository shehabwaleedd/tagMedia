import React  from 'react';
import styles from './style.module.scss';
import Trusted from '../trusted';
import Link from 'next/link';
import Icons from '../icons';
import { GoArrowUpRight } from "react-icons/go";
import global from "@/app/page.module.scss"


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
                    <h2>Markets, <span>Today</span></h2>
                </div>
                <div className={styles.buttons}>
                    <Link href='/about' className={global.button}>
                        <span>
                            About us
                        </span>
                        <GoArrowUpRight />
                    </Link>
                    <Link href='/contact' className={global.button}>
                        <span>
                            Contact us
                        </span>
                        <GoArrowUpRight />
                    </Link>
                </div>
                <Icons />
            </div>
            <Trusted />
        </section>
    );
};

export default Landing;
