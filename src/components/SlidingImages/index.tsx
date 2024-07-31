'use client'
import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import styles from './style.module.scss';
import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Swiper as SwiperInstance } from 'swiper';
import useWindowSize from '@/hooks/useWindowWidth';
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
SwiperCore.use([Navigation, Pagination]);
import Magnetic from '@/animation/Magnetic';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

interface Actor {
    image: {
        url: string;
    };
}

interface ImagesSliderProps {
    actors: Actor[];
}

export default function ImagesSlider({ actors }: ImagesSliderProps) {
    const swiperRef = useRef<SwiperInstance | null>(null);
    const { isMobile, isTablet, isDesktop } = useWindowSize();
    const container = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    });

    const x1 = useTransform(scrollYProgress, [0, 1], ['10vw', '-10vw']);

    const handleNextSlide = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    };

    const handlePrevSlide = () => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
        }
    };

    return (
        <div ref={container} className={styles.slidingImages}>
            <h2> Our Stars </h2>
            <div className={styles.slidingImages_btns}>
                <Magnetic>
                    <button onClick={handlePrevSlide}><GoArrowLeft /></button>
                </Magnetic>
                <Magnetic>
                    <button onClick={handleNextSlide}><GoArrowRight /></button>
                </Magnetic>
            </div>
            <motion.div style={{ x: x1 }} className={styles.slider}>
                <Swiper
                    onSwiper={(swiper) => { swiperRef.current = swiper; }}
                    spaceBetween={isMobile ? 20 : 50}
                    slidesPerView={isMobile ? 2 : isTablet ? 3 : isDesktop ? 4 : 5}
                    navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev"
                    }}
                >
                    {actors.map((project, index) => (
                        <SwiperSlide key={index}>
                            <div className={styles.project}>
                                <div className={styles.imageContainer}>
                                    <Image
                                        alt={"image"}
                                        src={project.image.url}
                                        width={1000}
                                        height={1000}
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>
        </div>
    );
}
