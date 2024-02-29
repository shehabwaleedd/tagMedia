import { motion } from 'framer-motion';
import styles from './style.module.scss';
import { HiOutlineMenuAlt4 } from "react-icons/hi";

export default function Button({ isActive, toggleMenu }) {
    return (
        <div className={styles.button}>
            <motion.div className={styles.slider}>
                <div className={styles.el} onClick={() => { toggleMenu() }}>
                    <div className={styles.perspectiveText}>
                        <p><HiOutlineMenuAlt4 /></p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}