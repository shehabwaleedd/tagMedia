import React from 'react'
import styles from "./style.module.scss"

const Spacer = ({ main, left, right }: { main: string, left: string, right: string }) => {
    return (
        <div className={styles.spacer}>
            <div className={styles.stripe}></div>
            <div className={styles.content}>
                <span>
                    {left}
                </span>
                {/* <h2> {main} </h2> */}
                
                <span>
                    {right}
                </span>
            </div>
        </div>
    )
}

export default Spacer