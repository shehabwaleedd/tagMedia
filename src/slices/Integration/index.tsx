import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import styles from "./style.module.scss";
import { PrismicNextImage } from "@prismicio/next";
import Link from "next/link";

export type IntegrationProps = SliceComponentProps<Content.IntegrationSlice>;

const Integration = ({ slice }: IntegrationProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className={styles.integration}>
      <div className={styles.upper}>
        <h2>{slice.primary.title}</h2>
        <p>
          {slice.primary.subtitle}
        </p>
      </div>
      <div className={styles.content}>
        {slice.primary.integrations.map((integration: any, i: number) => (
          <Link key={i} href={integration.link} aria-label={integration.name} target="_blank">
            <PrismicNextImage field={integration.image} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Integration;
