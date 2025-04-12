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
    selectedImage: number | null;
    openFullscreen: (index: number) => void;
    closeFullscreen: () => void;
    isFullscreenOpen: boolean;
    navigateImage: (direction: "next" | "prev") => void;
    thumbnailRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const ImageGallery = memo(function ImageGallery({ images, selectedImage, openFullscreen, closeFullscreen, navigateImage, thumbnailRefs, isFullscreenOpen }: ImageGalleryProps) {

    return (
        <div className={styles.gallery} role="region" aria-label="Image gallery">
            {images.map((item, index) => (
                <div key={`gallery-item-${index}`} className={styles.galleryItem} onClick={() => openFullscreen(index)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openFullscreen(index)} tabIndex={0} role="button" aria-label={item.caption || `Gallery image ${index + 1}`} ref={el => thumbnailRefs.current[index] = el}>
                    <PrismicNextImage field={item.image} className={styles.galleryImage} sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" alt={String(item.caption || `Gallery image ${index + 1}`) as ''} loading={index < 8 ? "eager" : "lazy"} />
                    <div className={styles.imageOverlay}>
                        <span className={styles.viewIcon} aria-hidden="true">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M21 3L14 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </div>
                    {item.caption && (
                        <div className={styles.imageCaption}>
                            <span>{item.caption.slice(0, 150)}</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
});

export default ImageGallery;