import React from 'react'
import styles from "./style.module.scss"
import Marquee from "@/animation/marquee/Marquee"

const index = () => {
    return (
        <section className={styles.aboveFooter}>
            <div className={styles.aboveFooter__container}>
                <h4>Tag Media</h4>
                <address>
                    <p>Address: <span>1st Floor, 3rd District, 6th of October, Giza, Egypt</span></p>
                    <p>Phone:  <a href="tel:+201023288200">+201023288200</a></p>
                    <p>Email:  <a href="mailto:hello@tagmedia.com">Hello@tagmedia.com </a></p>
                </address>
            </div>
            <Marquee />
        </section>
    )
}

export default index