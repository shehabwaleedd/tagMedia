import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import styles from "./style.module.scss"

export type AboutLowerProps = SliceComponentProps<Content.AboutLowerSlice>;


const AboutLower = ({ slice }: AboutLowerProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className={styles.aboutLower}>
      <div className={styles.aboutLower_left}>
        <h3>
          {slice.primary.title}
        </h3>
      </div>
      <div className={styles.aboutLower_right}>
        <p>
          {slice.primary.paragraghfirst}
        </p>
        <p>
          {slice.primary.paragraghsecond}
        </p>
      </div>
    </section>
  );
};

export default AboutLower;
