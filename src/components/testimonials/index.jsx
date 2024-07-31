'use client'
import React, { useRef, useState } from 'react';
import styles from './style.module.scss';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from 'swiper';
import  { Navigation, Pagination } from "swiper/modules"
import Magnetic from '@/animation/Magnetic';
import useWindowSize from '@/hooks/useWindowWidth';
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import Image from 'next/image';
import { CiCirclePlus } from "react-icons/ci";
import { motion, AnimatePresence } from 'framer-motion';



SwiperCore.use([Navigation, Pagination]);

const testimonialsData = [
    {
        id: 1,
        img: "/assets/stars/zaher.png",
        name: "Ahmed Zaher",
        position: "Actor",
        company: "Super Start",
        text: "Working With Tag Media is a great experience, they are very professional and they have a great team. When I met them, I felt that I am in the right place. They are very professional and they have a great team. When I met them, I felt that I am in the right place."
    },
    {
        id: 2,
        img: "/assets/stars/gelil.jpeg",
        name: "Amr Abdelgelil",
        position: "Actor",
        company: "Super Star",
        text: "I have been working with Tag Media for a long time, and I have always been satisfied with their work. They are very professional and they have a great team. When I met them, I felt that I am in the right place."
    },
    {
        id: 3,
        img: "/assets/stars/Mai.png",
        name: "Mai Omar",
        position: "Actor",
        company: "Super Start",
        text: "It was a pleasure working with Tag Media, they are very professional and they have a great team. When I met them, I felt that I am in the right place. They are very professional and they have a great team. When I met them, I felt that I am in the right place."
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
    const { isMobile } = useWindowSize();
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [selectedTestimonial, setSelectedTestimonial] = useState(null); // New state to track selected testimonial

    const handleDetailsOpen = (testimonial) => {
        setSelectedTestimonial(testimonial); // Set the selected testimonial
        setDetailsOpen(true); // Open the details view
    };

    const handleDetailsClose = () => {
        setDetailsOpen(false); // Close the details view
    };

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
                    slidesPerView={isMobile ? 1 : 3}
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
                                    <span  onClick={() => handleDetailsOpen(testimonial)}  className={styles.testimonials__slide_container_middle_readMore}>
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
            <AnimatePresence mode='wait'>
                {detailsOpen && selectedTestimonial && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.testimonialsDetailsModal}
                        onClick={handleDetailsClose}>
                        <div className={styles.testimonialsDetailsContent}>
                            <div className={styles.close}> <button onClick={handleDetailsClose}>Close</button> </div>
                            <Image src={selectedTestimonial.img} alt="testimonial" width={200} height={200} />
                            <p>{selectedTestimonial.text}</p>
                            <h4>{selectedTestimonial.name}</h4>
                            <h5>{selectedTestimonial.position}, {selectedTestimonial.company}</h5>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            </section>
        </>
    );
};

export default Testimonials;
