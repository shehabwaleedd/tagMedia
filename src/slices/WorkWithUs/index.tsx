'use client'
import React, { useEffect } from 'react'
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import styles from "./style.module.scss"
import { FaCalendarPlus } from "react-icons/fa";
import { getCalApi } from "@calcom/embed-react";

export type WorkWithUsProps = SliceComponentProps<Content.WorkWithUsSlice>;

const WorkWithUs = ({ slice }: WorkWithUsProps): JSX.Element => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({});
      cal("ui", {
        "styles": { "branding": { "brandColor": "#ff4b26" } },
        "hideEventTypeDetails": false,
        "layout": "month_view"
      });
    })();
  }, []);

  return (
    <section className={styles.workWithUs} data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <div className={styles.left}>
        <h3>
          {slice.primary.title}
        </h3>
        <p>
          {slice.primary.description}
        </p>
      </div>
      <div className={styles.right}>
        {slice.primary.partnership_options.map((item: any, index: number) => (
          <div className={styles.content} key={index} >
            <div className={styles.upper}>
              <h3>{item.option_title}</h3>
              <p>{item.option_description}</p>
            </div>
            <div className={styles.lower}>
              <button
                data-cal-namespace=""
                data-cal-link={item.calendar_link || process.env.NEXT_PUBLIC_CAL_LINK}
                data-cal-config='{"layout":"month_view"}'
              >
                <span>
                  {item.button_text}
                </span>
                <FaCalendarPlus />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkWithUs;