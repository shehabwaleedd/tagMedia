import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import styles from "./style.module.scss"
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";


export type DisplayProps = SliceComponentProps<Content.DisplaySlice>;

const Display = ({ slice }: DisplayProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className={styles.clients}> 
      <h3>{slice.primary.title}</h3>
      <div className={styles.content}>
        {slice.primary.images.map((item, index) => (
          <PrismicNextLink key={index} className={styles.logo_marquee_content} field={item.link}>
            <PrismicNextImage field={item.image}/>
          </PrismicNextLink>
        ))}
      </div>
    </section>
  );
};

export default Display;
