import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import styles from "./style.module.scss";
/**
 * Props for `Team`.
 */
export type TeamProps = SliceComponentProps<Content.TeamSlice>;

/**
 * Component for "Team" Slices.
 */
const Team = ({ slice }: TeamProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className={styles.team}>
      <h3> {slice.primary.title} </h3>
      <div className={styles.teamContainer}>
        {slice.primary.team.map((member, index) => (
          <div key={index} className={styles.member}>
            <div className={styles.image}>
              <PrismicNextImage field={member.image}/>
            </div>
            <div className={styles.text}>
              <h4>{member.name}</h4>
              <p>{member.position}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
