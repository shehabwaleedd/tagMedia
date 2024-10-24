import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React from 'react';
import styles from './style.module.scss';
const Icons = dynamic(() => import('../../components/icons'), { ssr: false });
import dynamic from 'next/dynamic';

/**
 * Props for `Landing`.
 */
export type LandingProps = SliceComponentProps<Content.LandingSlice>;

/**
 * Component for "Landing" Slices.
 */
const Landing = ({ slice }: LandingProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className={styles.landing}>
      <div className={styles.landing__content}>
        <div className={styles.left}>
          <h2>{slice.primary.firstline}</h2>
        </div>
        <div className={styles.middle}>
          <h2>{slice.primary.secondline}</h2>
        </div>
        <div className={styles.right}>
          <h2>{slice.primary.thirdline} <span className={styles.middle}>{slice.primary.span}</span></h2>
        </div>
        <Icons />
      </div>
    </section>
  );
};

export default Landing;
