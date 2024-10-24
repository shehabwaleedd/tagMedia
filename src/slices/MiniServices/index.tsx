import React from 'react'
import styles from "./style.module.scss"
import global from "@/app/page.module.scss"
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

export type MiniServicesProps = SliceComponentProps<Content.MiniServicesSlice>;

const MiniServices = ({ slice }: MiniServicesProps): JSX.Element => {
    return (
        <section className={styles.miniServices}>
            <div className={styles.miniServices__container}>
                {slice.primary.data.map((item, index) => (
                    <p key={index} className={global.button}>{item.buttonname}</p>
                ))}
            </div>
        </section>
    )
}

export default MiniServices