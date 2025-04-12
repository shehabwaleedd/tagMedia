'use client'
import React, { useState, useCallback, useMemo } from 'react';
import styles from "./style.module.scss";
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

export type VideoProps = SliceComponentProps<Content.VideoSlice>;

const Video = ({ slice }: VideoProps): JSX.Element => {
  const [isHovering, setIsHovering] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cursorX = useSpring(mouseX, { damping: 25, stiffness: 300 });
  const cursorY = useSpring(mouseY, { damping: 25, stiffness: 300 });

  const handleVideoToggle = useCallback(() => setVideoOpen(prev => !prev), []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => setIsHovering(false), []);

  const videoSrc = useMemo(() => slice.primary.video || '', [slice.primary.video]);

  const cursorVariants = useMemo(() => ({
    initial: { scale: 0, x: "-50%", y: "-50%" },
    enter: {
      scale: 1,
      x: "-50%",
      y: "-50%",
      transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
    },
    closed: {
      scale: 0,
      x: "-50%",
      y: "-50%",
      transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] }
    }
  }), []);

  return (
    <section className={styles.video} data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <div className={styles.content} onClick={handleVideoToggle} onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <video src={videoSrc} loop autoPlay muted playsInline preload="metadata" />
        <motion.div className={styles.cursor} style={{ left: cursorX, top: cursorY }} variants={cursorVariants} initial="initial" animate={isHovering ? "enter" : "closed"} />
        <motion.div className={styles.cursorLabel} style={{ left: cursorX, top: cursorY }} variants={cursorVariants} initial="initial" animate={isHovering ? "enter" : "closed"}>
          View
        </motion.div>
      </div>
      <AnimatePresence>
        {videoOpen && (
          <motion.div className={styles.videoModal} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <video src={videoSrc} controls autoPlay playsInline preload="metadata" />
            <motion.div className={styles.videoModal__close} onClick={handleVideoToggle} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <span>X</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default React.memo(Video);