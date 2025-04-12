'use client';

import styles from "./page.module.scss";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { format } from "date-fns";
import { memo, useEffect, useState, useCallback, useRef } from "react";
import BreadCrumbs from "@/app/news/(components)/breadCrumbs/BreadCrumbs";
import ImageGallery from "./imageGallery";
import { AnimatePresence, motion } from "framer-motion";

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
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const isFullscreenOpen = selectedImage !== null;
    const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]);

    const openFullscreen = useCallback((index: number) => {
        setSelectedImage(index);
    }, []);

    const closeFullscreen = useCallback(() => {
        setSelectedImage(null);

        if (selectedImage !== null && thumbnailRefs.current[selectedImage]) {
            thumbnailRefs.current[selectedImage]?.focus();
        }
    }, [selectedImage]);

    const navigateImage = useCallback((direction: "next" | "prev") => {
        if (selectedImage === null) return;

        setSelectedImage((prev) => {
            if (prev === null) return null;

            if (direction === "next") {
                return (prev + 1) % gallery_images.length;
            } else {
                return (prev - 1 + gallery_images.length) % gallery_images.length;
            }
        });
    }, [selectedImage, gallery_images.length]);

    useEffect(() => {
        if (!isFullscreenOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "Escape":
                    closeFullscreen();
                    break;
                case "ArrowRight":
                    navigateImage("next");
                    break;
                case "ArrowLeft":
                    navigateImage("prev");
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isFullscreenOpen, closeFullscreen, navigateImage]);


    return (
        <>
            <motion.article className={styles.clientDetails} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className={styles.wrapper}>
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
                        </section>
                    </div>

                    {hasGallery && (
                        <section className={styles.gallerySection}>
                            <div className={styles.sectionHeading}>
                                <h2 className={styles.galleryTitle}>Project Gallery</h2>
                                <div className={styles.sectionDivider}></div>
                            </div>
                            <ImageGallery images={gallery_images} selectedImage={selectedImage} isFullscreenOpen={isFullscreenOpen} openFullscreen={openFullscreen} closeFullscreen={closeFullscreen} navigateImage={navigateImage} thumbnailRefs={thumbnailRefs} />
                        </section>
                    )}

                    <div className={styles.ctaSection}>
                        <h2 className={styles.ctaTitle}>Interested in working with us?</h2>
                        <p className={styles.ctaText}>Let&apos;s discuss your next project and create something amazing together.</p>
                        <a href="/contact" className={styles.ctaButton}>Contact Us</a>
                    </div>
                </div>
            </motion.article>

            <AnimatePresence mode="wait">
                {isFullscreenOpen && selectedImage !== null && (
                    <motion.div className={styles.fullscreenOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={closeFullscreen} role="dialog" aria-modal="true" aria-label="Fullscreen gallery">
                        <button className={`${styles.navButton} ${styles.closeButton}`} onClick={closeFullscreen} aria-label="Close fullscreen view">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        <div className={styles.fullscreenImageContainer}>
                            <PrismicNextImage field={gallery_images[selectedImage].image} className={styles.fullscreenImage} sizes="100vw" priority alt={String(gallery_images[selectedImage].caption || `Gallery image ${selectedImage + 1}`) as ''} />
                        </div>

                        {gallery_images[selectedImage].caption && (
                            <div className={styles.fullscreenCaption}>
                                <p>{gallery_images[selectedImage].caption}</p>
                            </div>
                        )}

                        <button className={`${styles.navButton} ${styles.prevButton}`} onClick={(e) => { e.stopPropagation(); navigateImage("prev"); }} aria-label="Previous image">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        <button className={`${styles.navButton} ${styles.nextButton}`} onClick={(e) => { e.stopPropagation(); navigateImage("next"); }} aria-label="Next image">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        <div className={styles.imageCounter}>
                            {selectedImage + 1} / {gallery_images.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
});

export default ClientDetails;