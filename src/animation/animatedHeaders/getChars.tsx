'use client'
import React from 'react';
import { translate } from "@/components/navbar/anim";
import { motion } from "framer-motion"
import styles from "./style.module.scss"

interface GetCharsProps {
    word: string;
}

const GetChars: React.FC<GetCharsProps> = ({ word }) => {
    return word.split("").map((char, i) => (
        <div className={styles.getChars} key={char + i}>
            <motion.h2
                custom={[i * 0.02, (word.length - i) * 0.01]}
                variants={translate}
                initial="initial"
                animate="enter"
                exit="exit">
                {char === " " ? "\u00A0" : char}
            </motion.h2>
        </div>
    ));
};

export default GetChars;