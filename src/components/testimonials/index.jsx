'use client'
import React, { useRef } from 'react';
import styles from './style.module.scss';
import { GoArrowRight } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";
import Magnetic from '@/animation/Magnetic';
import { Swiper, SwiperSlide } from "swiper/react";
import useWindowWidth from '@/hooks/useWindowWidth';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import Image from 'next/image';
import { CiCirclePlus } from "react-icons/ci";


SwiperCore.use([Navigation, Pagination]);

const testimonialsData = [
    {
        id: 1,
        img: "/assets/stars/AHMED ZAHER.png",
        name: "John Doe",
        position: "Managing Partner",
        company: "XYZ Company",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam ad harum iure mollitia. Amet corrupti placeat sequi deleniti quisquam quae autem ea quis doloribus sint facilis similique animi a, atque incidunt pariatur impedit quaerat illum ex minima velit, inventore saepe? Nesciunt enim quia, nam illo provident ad velit. Deserunt animi, neque vitae eius voluptate aut doloremque explicabo optio nesciunt totam quisquam et, maxime, molestiae sed quaerat.."
    },
    {
        id: 2,
        img: "/assets/stars/AHMED ZAHER.png",
        name: "John Doe",
        position: "Managing Partner",
        company: "XYZ Company",
        title: "Jane Doe, CTO, Another Company",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam ad harum iure mollitia. Amet corrupti placeat sequi deleniti quisquam quae autem ea quis doloribus sint facilis similique animi a, atque incidunt pariatur impedit quaerat illum ex minima velit, inventore saepe? Nesciunt enim quia, nam illo provident ad velit. Deserunt animi, neque vitae eius voluptate aut doloremque explicabo optio nesciunt totam quisquam et, maxime, molestiae sed quaerat."
    },
    {
        id: 3,
        img: "/assets/stars/AHMED ZAHER.png",
        name: "John Doe",
        position: "Managing Partner",
        company: "XYZ Company",
        title: "Jim Beam, Founder, Startup XYZ",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam ad harum iure mollitia. Amet corrupti placeat sequi deleniti quisquam quae autem ea quis doloribus sint facilis similique animi a, atque incidunt pariatur impedit quaerat illum ex minima velit, inventore saepe? Nesciunt enim quia, nam illo provident ad velit. Deserunt animi, neque vitae eius voluptate aut doloremque explicabo optio nesciunt totam quisquam et, maxime, molestiae sed quaerat."
    },

    {
        id: 1,
        img: "/assets/stars/AHMED ZAHER.png",
        name: "John Doe",
        position: "Managing Partner",
        company: "XYZ Company",
        title: "John Doe, CEO, Company Name",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam ad harum iure mollitia. Amet corrupti placeat sequi deleniti quisquam quae autem ea quis doloribus sint facilis similique animi a, atque incidunt pariatur impedit quaerat illum ex minima velit, inventore saepe? Nesciunt enim quia, nam illo provident ad velit. Deserunt animi, neque vitae eius voluptate aut doloremque explicabo optio nesciunt totam quisquam et, maxime, molestiae sed quaerat.."
    },
    {
        id: 2,
        img: "/assets/stars/AHMED ZAHER.png",
        name: "John Doe",
        position: "Managing Partner",
        company: "XYZ Company",
        title: "Jane Doe, CTO, Another Company",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam ad harum iure mollitia. Amet corrupti placeat sequi deleniti quisquam quae autem ea quis doloribus sint facilis similique animi a, atque incidunt pariatur impedit quaerat illum ex minima velit, inventore saepe? Nesciunt enim quia, nam illo provident ad velit. Deserunt animi, neque vitae eius voluptate aut doloremque explicabo optio nesciunt totam quisquam et, maxime, molestiae sed quaerat."
    },
    {
        id: 3,
        img: "/assets/stars/AHMED ZAHER.png",
        name: "John Doe",
        position: "Managing Partner",
        company: "XYZ Company",
        title: "Jim Beam, Founder, Startup XYZ",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam ad harum iure mollitia. Amet corrupti placeat sequi deleniti quisquam quae autem ea quis doloribus sint facilis similique animi a, atque incidunt pariatur impedit quaerat illum ex minima velit, inventore saepe? Nesciunt enim quia, nam illo provident ad velit. Deserunt animi, neque vitae eius voluptate aut doloremque explicabo optio nesciunt totam quisquam et, maxime, molestiae sed quaerat."
    },

];

const Testimonials = () => {
    const swiperRef = useRef(null);
    const windowWidth = useWindowWidth()
    const isMobile = windowWidth < 777

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
        <>
            <div className={styles.testimonials_btns}>
                <Magnetic>
                    <button onClick={handlePrevSlide}><GoArrowLeft /></button>
                </Magnetic>
                <Magnetic>
                    <button onClick={handleNextSlide}><GoArrowRight /></button>
                </Magnetic>
            </div>
            <section className={styles.testimonials}>
                <Swiper
                    onSwiper={(swiper) => { swiperRef.current = swiper; }}
                    ref={swiperRef}
                    spaceBetween={isMobile ? 20 : 50}
                    slidesPerView={isMobile ? 1 : 4}
                    pagination={{ clickable: true }}
                    navigation={
                        {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev"
                        }
                    }

                    className={styles.testimonials__slide}
                >
                    {testimonialsData.map((testimonial, index) => (
                        <SwiperSlide key={index}>
                            <div className={styles.testimonials__slide_container}>
                                <Image src={testimonial.img} alt="testimonial" width={200} height={200} priority="low" />
                                <p>&quot;{testimonial.text.slice(0, 150)}...&quot;</p>
                                <div className={styles.testimonials__slide_container_middle}>
                                    <CiCirclePlus />
                                    <span>
                                        Read More
                                    </span>
                                </div>
                                <div className={styles.testimonials__slide_container_lower}>
                                    <h4>{testimonial.name}</h4>
                                    <h4>{testimonial.position}</h4>
                                    <h4>{testimonial.company}</h4>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
        </>
    );
};

export default Testimonials;
