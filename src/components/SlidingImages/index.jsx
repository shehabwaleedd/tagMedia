'use client'
import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import styles from './style.module.scss';
import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from 'swiper';
import useWindowWidth from '@/hooks/useWindowWidth';
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
SwiperCore.use([Navigation, Pagination]);
import Magnetic from '@/animation/Magnetic';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const slider1 = [
    {
        src: "/assets/stars/AHMED ZAHER.png"
    },
    {
        src: "/assets/stars/AMR ABDULGLIL.png"

    },
    {
        src: "/assets/stars/AMR SAAD.png"
    },
    {
        src: "/assets/stars/CAROLINE AZMY.png"
    },
    {
        src: "/assets/stars/DINA FOAAD.png"
    },
    {
        src: "/assets/stars/HANY SHAKER.png"
    },
    {
        src: "/assets/stars/HASSAN ELRADDAD.png"
    },
    {
        src: "/assets/stars/MAI OMAR.png"
    }
]


export default function ImagesSlider() {
    const swiperRef = useRef(null);
    const windowWidth = useWindowWidth()
    const isMobile = windowWidth < 555;
    const isTablet = windowWidth < 777
    const isBigScreen = windowWidth < 1900
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    })

    const x1 = useTransform(scrollYProgress, [0, 1], ['10vw', '-10vw'])

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
                    ref={swiperRef}
                    spaceBetween={isMobile ? 20 : 50}
                    slidesPerView={
                        isMobile ? 2 : isTablet ? 3 : isBigScreen ? 4 : 5

                    }
                    navigation={
                        {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev"
                        }
                    }>
                    {
                        slider1.map((project, index) => (
                            <SwiperSlide key={index}>
                                <div className={styles.project} >
                                    <div className={styles.imageContainer}>
                                        <Image
                                            alt={"image"}
                                            src={project.src}
                                            width={1000}
                                            height={1000}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </motion.div>
        </div>
    )
}
