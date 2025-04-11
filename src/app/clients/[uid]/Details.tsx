'use client';

import styles from "./page.module.scss";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { format } from "date-fns";
import { memo, useEffect } from "react";
import BreadCrumbs from "@/app/news/(components)/breadCrumbs/BreadCrumbs";
import ImageGallery from "./imageGallery";
import { motion } from "framer-motion";

interface GalleryImage {
    image: any;
    caption?: string;
}

interface ClientPostData {
    title: string;
    description: any;
    image: any;
    year: string;
    type: "actor" | "serie" | "production";
    gallery_images: GalleryImage[];
}

interface ClientPostDocument {
    data: ClientPostData;
}

const ClientDetails = memo(function ClientDetails({ page }: { page: ClientPostDocument; }) {
    const { title, description, image, year, type, gallery_images } = page.data;
    const formattedDate = year ? format(new Date(year), 'yyyy') : '';
    const hasGallery = gallery_images && gallery_images.length > 0;

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <motion.article className={styles.clientDetails} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <BreadCrumbs data={page} />
                    <div className={styles.titleContainer}>
                        <h1 className={styles.title}>{title}</h1>
                        <div className={styles.meta}>
                            <span className={styles.type}>{type}</span>
                            {formattedDate && (
                                <time className={styles.year} dateTime={formattedDate}>
                                    {formattedDate}
                                </time>
                            )}
                        </div>
                    </div>
                </header>

                <div className={styles.contentGrid}>
                    <motion.figure className={styles.imageContainer} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
                        <PrismicNextImage field={image} className={styles.portfolioImage} priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw" alt={String(`Portfolio work for ${title}`) as ''} loading="eager" />
                    </motion.figure>

                    <section className={styles.infoContainer}>
                        <div className={styles.descriptionContainer}>
                            <div className={styles.description}>
                                <PrismicRichText field={description} />
                            </div>
                        </div>

                        <div className={styles.projectStats}>
                            {type && (
                                <div className={styles.statItem}>
                                    <h3 className={styles.statLabel}>Project Type</h3>
                                    <p className={styles.statValue}>{type}</p>
                                </div>
                            )}
                            {formattedDate && (
                                <div className={styles.statItem}>
                                    <h3 className={styles.statLabel}>Year</h3>
                                    <p className={styles.statValue}>{formattedDate}</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                {hasGallery && (
                    <section className={styles.gallerySection}>
                        <div className={styles.sectionHeading}>
                            <h2 className={styles.galleryTitle}>Project Gallery</h2>
                            <div className={styles.sectionDivider}></div>
                        </div>
                        <ImageGallery images={gallery_images} />
                    </section>
                )}

                <div className={styles.ctaSection}>
                    <h2 className={styles.ctaTitle}>Interested in working with us?</h2>
                    <p className={styles.ctaText}>Let&apos;s discuss your next project and create something amazing together.</p>
                    <a href="/contact" className={styles.ctaButton}>Contact Us</a>
                </div>
            </div>
        </motion.article>
    );
});

export default ClientDetails;