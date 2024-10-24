'use client'
import React from 'react';
import styles from "./style.module.scss"
import AnimatedTitles from '@/animation/AnimatedTitles';
import Image from 'next/image';
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

export type HeroSectionProps = SliceComponentProps<Content.HeroSectionSlice>;

const HeroSection = ({ slice }: HeroSectionProps): JSX.Element => {
  const phrase1 = slice.primary.phrase1 ?? ''
  const phrase2 = slice.primary.phrase2 ?? ''
  const centerPhrase = slice.primary.centerphrase ?? '';
  const direction = slice.primary.direction ?? 'leftBottom'
  const gradient = slice.primary.gradient ?? true

  return (
    <section className={styles.videoContainer}>
      <div className={`${styles.video} ${gradient ? styles.withGradient : styles.withoutGradient}`}>
        <Image src={slice.primary.imglink?.url ?? ""} layout="fill" objectFit="cover" alt="Video poster" priority />
        <div className={`${direction === "center" ? styles.center : styles.abs}`}>
          <AnimatedTitles phrase={phrase1} phrase2={phrase2} centerPhrase={centerPhrase} direction={direction as "leftBottom" | "center"} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
