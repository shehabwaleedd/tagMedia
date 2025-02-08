'use client'
import React, { useRef, useState, useEffect } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { PrismicNextImage } from '@prismicio/next';
import styles from "./style.module.scss";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import { Content } from '@prismicio/client';

interface NewsPost {
    id: string;
    uid: string;
    title: string | null;
    description: string | null;
    featured_image: any;
    tags: any[];
}

type NewsSliderSlice = Content.NewsSliderSlice;
const Slide: React.FC<{ newsPostsData: NewsPost[]; slice: NewsSliderSlice }> = ({ newsPostsData, slice }) => {
    const [swiper, setSwiper] = useState<SwiperType | null>(null);
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

    return (
        <section className={styles.achievementsCarousel}>
            <div className={styles.container}>
                <div className={styles.achievementsCarousel__upper}>
                    <div className={styles.achievementsCarousel__content}>
                        <h2 className={styles.sectionTitle}>{slice.primary.title}</h2>
                        <p className={styles.sectionText}>{slice.primary.text}</p>
                    </div>
                    <div className={styles.carouselBtns}>
                        <button ref={prevRef} className={`${styles.carouselBtn} ${styles.prevBtn}`}>
                            <FaChevronLeft />
                        </button>
                        <button ref={nextRef} className={`${styles.carouselBtn} ${styles.nextBtn}`}>
                            <FaChevronRight />
                        </button>
                    </div>
                </div>
                <div className={styles.achievementsCarousel__lower}>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={20}
                        slidesPerView={3}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        onSwiper={setSwiper}
                        onBeforeInit={(swiper) => {
                            if (typeof swiper.params.navigation !== 'boolean') {
                                if (swiper.params.navigation) {
                                    swiper.params.navigation.prevEl = prevRef.current;
                                    swiper.params.navigation.nextEl = nextRef.current;
                                }
                            }
                            swiper.navigation.update();
                        }}
                        breakpoints={{
                            320: {
                                slidesPerView: 1.15,
                                spaceBetween: 10
                            },
                            640: {
                                slidesPerView: 2.15,
                                spaceBetween: 15
                            },
                            1024: {
                                slidesPerView: 3.25,
                                spaceBetween: 20
                            }
                        }}
                        className={styles.swiper}
                    >
                        {newsPostsData.map((newsPost) => (
                            <SwiperSlide key={newsPost.id} className={styles.swiperSlide}>
                                <Link href={`/news/${newsPost.uid}`} className={styles.card}>
                                    <PrismicNextImage field={newsPost.featured_image} className={styles.cardImage} />

                                    <div className={styles.cardContent}>
                                        <div className={styles.tags}>
                                            {newsPost.tags && newsPost.tags.map((tag, index) => (
                                                <span key={index} className={styles.tag}>{tag.tag}</span>
                                            ))}
                                        </div>
                                        <h3 className={styles.cardTitle}>{newsPost.title?.slice(0, 30)}...</h3>
                                        <p className={styles.cardExcerpt}>{newsPost.description?.slice(0, 100)}...</p>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Slide;