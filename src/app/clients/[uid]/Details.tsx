import styles from "./page.module.scss";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { format } from "date-fns";

interface ClientPostData {
    title: string;
    description: any; 
    image: any; 
    year: string;
    type: "actor" | "serie" | "production";
}

interface ClientPostDocument {
    data: ClientPostData;
}

export default function ClientDetails({
    page
}: {
    page: ClientPostDocument
}) {
    const { title, description, image, year, type } = page.data;
    const formattedDate = year ? format(new Date(year), 'yyyy') : '';

    return (
        <section className={styles.clientDetails}>
            <div className={styles.heroSection}>
                <PrismicNextImage
                    field={image}
                    className={styles.heroImage}
                    priority
                />
            </div>

            <div className={styles.contentContainer}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{title}</h1>
                    <div className={styles.meta}>
                        <span className={styles.type}>{type}</span>
                        <span className={styles.year}>{formattedDate}</span>
                    </div>
                </div>

                <div className={styles.description}>
                    <PrismicRichText field={description} />
                </div>
            </div>
        </section>
    );
}