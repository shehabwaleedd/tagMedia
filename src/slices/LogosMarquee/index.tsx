'use client'
import React, { useState, useEffect } from 'react'
import Marquee from "react-fast-marquee";
import styles from './style.module.scss'
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import { SliceComponentProps } from "@prismicio/react";

export type LogosMarqueeProps = SliceComponentProps<Content.LogosMarqueeSlice>;

interface LogoImageProps {
  image: any;
  alt?: string;
}


const LogoImage = (({ image, alt }: LogoImageProps) => (
  <div className={styles.logo_wrapper}>
    <PrismicNextImage field={image} priority={true} className={styles.logo_image} alt={String(alt || 'Partner logo') as ''} loading="eager" />
  </div>
));

const LogosMarquee = ({ slice }: LogosMarqueeProps): JSX.Element => {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className={styles.logo_marquee}>
      {mounted && (
        <Marquee autoFill={true} speed={40} direction={slice.primary.direction as "left" | "right" | "up" | "down" | undefined} gradient={true} gradientColor="#161616" gradientWidth={20} pauseOnHover={true}>
          {slice.primary.data?.map((item, index) => (
            <LogoImage key={`logo-${index}`} image={item.image} alt={item.image?.alt || ''} />
          ))}
        </Marquee>
      )}
    </section>
  );
};

export default LogosMarquee;
