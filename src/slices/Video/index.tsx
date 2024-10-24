'use client'
import React, { useState, useEffect, useRef } from 'react';
import styles from "./style.module.scss"
import { motion } from 'framer-motion';
import gsap from 'gsap';


const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: { scale: 1, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
  closed: { scale: 0, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] } }
};

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Video`.
 */
export type VideoProps = SliceComponentProps<Content.VideoSlice>;

/**
 * Component for "Video" Slices.
 */
const Video = ({ slice }: VideoProps): JSX.Element => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const cursor = useRef<HTMLDivElement | null>(null);
  const cursorLabel = useRef<HTMLDivElement | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  const handleVideoOpen = () => {
    setVideoOpen(!videoOpen);
  };


  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    videoElement.addEventListener('mouseenter', handleMouseEnter);
    videoElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      videoElement.removeEventListener('mouseenter', handleMouseEnter);
      videoElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [videoRef]);

  useEffect(() => {
    let xMoveCursor = gsap.quickTo(cursor.current, "left", { duration: 0.5, ease: "power3" });
    let yMoveCursor = gsap.quickTo(cursor.current, "top", { duration: 0.5, ease: "power3" });
    let xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", { duration: 0.45, ease: "power3" });
    let yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", { duration: 0.45, ease: "power3" });

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      const { clientX, clientY } = e;
      const videoContainerRef = videoRef.current;
      if (!videoContainerRef) return;
      const videoContainerPosition = videoContainerRef.getBoundingClientRect();
      const y = clientY - videoContainerPosition.top;
      const x = clientX - videoContainerPosition.left;
      xMoveCursor(x);
      yMoveCursor(y);
      xMoveCursorLabel(x);
      yMoveCursorLabel(y);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [videoRef]);


  return (
    <section className={styles.video} data-slice-type={slice.slice_type} data-slice-variation={slice.variation} >
      <div className={styles.content} ref={videoRef} onClick={handleVideoOpen}>
        <video src={slice.primary.video || ''} loop autoPlay muted playsInline preload="metadata" />
        <motion.div ref={cursor} className={styles.cursor} variants={scaleAnimation} initial="initial" animate={isHovering ? "enter" : "closed"}></motion.div>
        <motion.div ref={cursorLabel} className={styles.cursorLabel} variants={scaleAnimation} initial="initial" animate={isHovering ? "enter" : "closed"}>View</motion.div>
      </div>
      {videoOpen && (
        <motion.div key="videoOpenedId" className={styles.videoModal} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <video src={slice.primary.video || ''} controls autoPlay playsInline preload="metadata" />
          <div className={styles.videoModal__close} onClick={handleVideoOpen}>
            <span>X</span>
          </div>
        </motion.div>
      )}
    </section>
  )
};

export default Video;
