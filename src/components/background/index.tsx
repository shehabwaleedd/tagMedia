import React from 'react';
import Image from 'next/image';
import styles from "./style.module.scss"
const Background = () => {
    return (
        <div className={styles.fixed}>
            {/* <Image
                src="/background.jpeg"
                alt="Background"
                layout="fill"
                objectFit="cover"
                quality={100}
                priority
            /> */}
        </div>
    );
};

export default Background;