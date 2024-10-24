import React, { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import styles from "./style.module.scss"
import { slideUp, translate } from "../anim";
import Link from 'next/link';

interface AnimatedTitlesProps {
    phrase: string;
    phrase2?: string;
    color?: string;
    link?: string;
    linkText?: string;
    centerPhrase?: string;
    direction: 'center' | 'leftBottom';
}

const AnimatedTitles: React.FC<AnimatedTitlesProps> = ({ phrase, centerPhrase, phrase2, color, link, linkText, direction }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.5 });

    const renderAnimatedPhrase = (text: string, isSubtitle: boolean = false) => (
        <p className={isSubtitle ? styles.subtitle : ''}>
            {text.split(" ").map((word, wordIndex) => (
                <span key={word + wordIndex} className={styles.word}>
                    {word.split("").map((char, charIndex) => (
                        <span className={styles.mask} key={char + charIndex}>
                            <motion.span
                                custom={[wordIndex * 5 + charIndex, isSubtitle]}
                                variants={isSubtitle ? slideUp : translate}
                                initial="initial"
                                animate={isInView ? "enter" : "exit"}
                                style={{ color: color ?? "#fafafa", display: 'inline-block' }}
                            >
                                {char}
                            </motion.span>
                        </span>
                    ))}
                    {" "}
                </span>
            ))}
        </p>
    );

    return (
        <div className={styles.description} ref={containerRef}>
            {centerPhrase && renderAnimatedPhrase(centerPhrase)}
            {renderAnimatedPhrase(phrase)}
            {phrase2 && renderAnimatedPhrase(phrase2, true)}
            {link && (
                <Link href={link}>
                    {linkText}
                </Link>
            )}
        </div>
    );
};

export default AnimatedTitles;