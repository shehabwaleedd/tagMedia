import React from 'react'
import styles from "./page.module.scss"
import Data from './Data'
const Privacy = () => {
    return (
        <section className={styles.privacy}>
            <div className={styles.privacy__title}>
                <h1>
                    Privacy Policy
                </h1>
            </div>
            <div className={styles.privacy__container}>
                {Data.map((item, index) => {
                    return (
                        <div className={styles.privacy__container__item} key={index}>
                            <h2> {item.title} </h2>
                            <p> {item.text} </p>
                        </div>
                    )
                })
                }
            </div>
        </section>
    )
}

export default Privacy