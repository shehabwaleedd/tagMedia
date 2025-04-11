'use client'

import { useState, useCallback, useEffect, memo, useRef } from "react";
import { PrismicNextImage } from "@prismicio/next";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./style.module.scss";

interface GalleryImage {
    image: any;
    caption?: string;
}

interface ImageGalleryProps {
    images: GalleryImage[];
}

const ImageGallery = memo(function ImageGallery({ images }: ImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const isFullscreenOpen = selectedImage !== null;
    const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]);

    const openFullscreen = useCallback((index: number) => {
        setSelectedImage(index);
        document.body.style.overflow = "hidden";
    }, []);

    const closeFullscreen = useCallback(() => {
        setSelectedImage(null);
        document.body.style.overflow = "";

        if (selectedImage !== null && thumbnailRefs.current[selectedImage]) {
            thumbnailRefs.current[selectedImage]?.focus();
        }
    }, [selectedImage]);

    const navigateImage = useCallback((direction: "next" | "prev") => {
        if (selectedImage === null) return;

        setSelectedImage((prev) => {
            if (prev === null) return null;

            if (direction === "next") {
                return (prev + 1) % images.length;
            } else {
                return (prev - 1 + images.length) % images.length;
            }
        });
    }, [selectedImage, images.length]);

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
            <div className={styles.gallery} role="region" aria-label="Image gallery">
                {images.map((item, index) => (
                    <div key={`gallery-item-${index}`} className={styles.galleryItem} onClick={() => openFullscreen(index)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openFullscreen(index)} tabIndex={0} role="button" aria-label={item.caption || `Gallery image ${index + 1}`} ref={el => thumbnailRefs.current[index] = el}>
                        <div className={styles.imageWrapper}>
                            <PrismicNextImage field={item.image} className={styles.galleryImage} sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" alt={String(item.caption || `Gallery image ${index + 1}`) as ''} loading={index < 8 ? "eager" : "lazy"} />
                            <div className={styles.imageOverlay}>
                                <span className={styles.viewIcon} aria-hidden="true">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M21 3L14 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        {item.caption && (
                            <div className={styles.caption}>
                                <span>{item.caption}</span>
                            </div>
                        )}
                    </div>
                ))}

            </div>

            <AnimatePresence mode="wait">
                {isFullscreenOpen && selectedImage !== null && (
                    <motion.div className={styles.fullscreenOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={closeFullscreen} role="dialog" aria-modal="true" aria-label="Fullscreen gallery">
                        <button className={`${styles.navButton} ${styles.closeButton}`} onClick={closeFullscreen} aria-label="Close fullscreen view">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        <div className={styles.fullscreenImageContainer}>
                            <PrismicNextImage field={images[selectedImage].image} className={styles.fullscreenImage} sizes="100vw" priority alt={String(images[selectedImage].caption || `Gallery image ${selectedImage + 1}`) as ''} />
                        </div>

                        {images[selectedImage].caption && (
                            <div className={styles.fullscreenCaption}>
                                <p>{images[selectedImage].caption}</p>
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
                            {selectedImage + 1} / {images.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
});

export default ImageGallery;