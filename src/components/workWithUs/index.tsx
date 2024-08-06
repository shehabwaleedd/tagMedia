'use client'
import React, { useEffect } from 'react'
import styles from "./style.module.scss"
import { FaCalendarPlus } from "react-icons/fa";
import { getCalApi } from "@calcom/embed-react";


const WorkWithUs = () => {

    useEffect(() => {
        (async function () {
            const cal = await getCalApi({});
            cal("ui", { "styles": { "branding": { "brandColor": "#ff4b26" } }, "hideEventTypeDetails": false, "layout": "month_view" });
        })();
    }, [])

    return (
        <section className={styles.workWithUs}>
            <div className={styles.left}>
                <h3>
                    Partner with us
                </h3>
                <p>
                    Transform your presence with our comprehensive marketing, creative, and development solutions for celebrities, brands, and series.
                </p>
            </div>
            <div className={styles.right}>
                <div className={styles.content}>
                    <div className={styles.upper}>
                        <h3> One-off Project </h3>
                        <p> Launch or elevate your brand or execute a high-impact marketing campaign.</p>
                    </div>
                    <div className={styles.lower}>
                        <button data-cal-namespace="" data-cal-link={process.env.NEXT_PUBLIC_CAL_LINK} data-cal-config='{"layout":"month_view"}'>
                            <span>
                                Book 30m Consultation
                            </span>
                            <FaCalendarPlus />
                        </button>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.upper}>
                        <h3> Partnerships </h3>
                        <p> Collaborate for long-term success with customized strategies for sustained growth and visibility.</p>
                    </div>
                    <div className={styles.lower}>
                        <button data-cal-namespace="" data-cal-link={process.env.NEXT_PUBLIC_CAL_LINK} data-cal-config='{"layout":"month_view"}'>
                            <span>
                                Schedule a Discovery Call
                            </span>
                            <FaCalendarPlus />
                        </button>
                    </div>

                </div>
            </div>

        </section>
    )
}

export default WorkWithUs