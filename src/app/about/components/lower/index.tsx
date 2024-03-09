'use client'
import React from 'react'
import styles from "./style.module.scss"

const AboutLower: React.FC = () => {
    return (
        <section className={styles.aboutLower}>
            <div className={styles.aboutLower_left}>
                <h3>
                    BaseCreate is a leading strategy and creative agency
                    helping forward-thinking companies to realise their growth potential
                </h3>
            </div>
            <div className={styles.aboutLower_right}>
                <p>
                    We are committed to brand growth and transformation. Our agency helps clients uncover new possibilities to adapt to a changing market, supply chain, and future.
                </p>
                <p>
                    To us, growth is more than just sales – it also means growing closer to your customers, and developing a common vision around topics they care about, like environmental and social issues.
                </p>
                <p>
                    Our approach embraces new strategies and multidisciplinary creative approaches to help your brand continually evolve to stay relevant.

                </p>
            </div>
        </section>
    )
}

export default AboutLower