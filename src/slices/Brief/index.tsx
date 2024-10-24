import React from 'react';
import styles from "./style.module.scss"
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import MiniServices from '../MiniServices';
import { MiniServicesData } from '@/types/types';
import global from "@/app/page.module.scss"

export type BriefProps = SliceComponentProps<Content.BriefSlice>;

const Brief = ({ slice }: BriefProps): JSX.Element => {


    return (
        <section className={styles.brief}>
            <div className={styles.content}>
                <h2 className={styles.brief__title}>{slice.primary.title}</h2>
                <span> {slice.primary.desc}</span>
                <section className={styles.miniServices}>
                    <div className={styles.miniServices__container}>
                        {slice.primary.data?.map((item, index) => (
                            <p key={index} className={global.button}>
                                {item.buttonname}
                            </p>
                        ))}
                    </div>
                </section>
            </div>
        </section>
    )
}

export default Brief