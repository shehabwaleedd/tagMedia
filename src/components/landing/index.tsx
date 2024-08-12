import dynamic from 'next/dynamic';
import React  from 'react';
import styles from './style.module.scss';
import Link from 'next/link';
import { GoArrowUpRight } from "react-icons/go";
import global from "@/app/page.module.scss"
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

        </section>
    );
};

export default Landing;
