'use client'
import React, { useState, useEffect } from 'react'
import Marquee from "react-fast-marquee";
import Image from 'next/image';
import styles from './style.module.scss'
import Link from 'next/link';
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { SliceComponentProps } from "@prismicio/react";

export type LogosMarqueeProps = SliceComponentProps<Content.LogosMarqueeSlice>;

const LogosMarquee = ({ slice }: LogosMarqueeProps): JSX.Element => {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className={styles.logo_marquee}>
      <div className={styles.container}>
        {mounted && (
          <Marquee autoFill={true} speed={40} direction={slice.primary.direction as "left" | "right" | "up" | "down" | undefined}>
            {slice.primary.data.map((item, index) => (
              <PrismicNextLink key={index} className={styles.logo_marquee_content} field={item.link} >
                <PrismicNextImage field={item.image} priority={true} />
              </PrismicNextLink>
            ))}
          </Marquee>
        )}
      </div>
    </section>
  );
};

export default LogosMarquee;
