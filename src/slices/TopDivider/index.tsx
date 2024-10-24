'use client'
import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from "./style.module.scss";
import { usePathname } from 'next/navigation';
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { useScroll, useTransform, motion } from 'framer-motion';

export type TopDividerProps = SliceComponentProps<Content.TopDividerSlice>;

const TopDivider = ({ slice }: TopDividerProps): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "100vh"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])


  return (
    <motion.section className={styles.divider} ref={containerRef} style={{ y, opacity }}>
      <h2>
        {slice.primary.title}
      </h2>
    </motion.section>
  );
};

export default TopDivider;
