import styles from "./page.module.scss";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { format } from "date-fns";
import { memo } from "react";
import BreadCrumbs from "@/app/news/(components)/breadCrumbs/BreadCrumbs";

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

const ClientDetails = memo(function ClientDetails({
    page
}: {
    page: ClientPostDocument;
}) {
    const { title, description, image, year, type } = page.data;
    const formattedDate = year ? format(new Date(year), 'yyyy') : '';

    return (
        <article className={styles.clientDetails}>
            <div className={styles.contentGrid}>
                <figure className={styles.imageContainer} aria-label="Client image">
                    <PrismicNextImage
                        field={image}
                        className={styles.portfolioImage}
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        alt={String(`Portfolio work for ${title}`) as ''}
                        loading="eager"
                        aria-label="Client image"
                    />
                </figure>

                <section className={styles.descriptionContainer}>
                    <header className={styles.header} aria-label="Project header">
                        <BreadCrumbs data={page} />
                        <h1 className={styles.title} aria-label="Project title">{title}</h1>
                        <div className={styles.meta} aria-label="Project metadata">
                            <span className={styles.type} aria-label="Project type">{type}</span>
                            <time className={styles.year} dateTime={formattedDate} aria-label="Project year" role="time">
                                {formattedDate}
                            </time>
                        </div>
                    </header>
                    <div className={styles.description} role="region" aria-label="Project description">
                        <PrismicRichText field={description}  />
                    </div>
                </section>
            </div>
        </article>
    );
});

export default ClientDetails;