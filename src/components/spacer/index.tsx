import React from 'react'
import styles from "./style.module.scss"

const Spacer = ({ left, right }: { left: string, right: string }) => {
    return (
        <div className={styles.spacer}>
            <div className={styles.stripe}></div>
            <div className={styles.content}>
                <span>
                    {left}
                </span>
                <span>
                    {right}
                </span>
            </div>
        </div>
    )
}

export default Spacer