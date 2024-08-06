'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from '../swiper';
import styles from './style.module.scss'

interface Testimonial {
    id: number;
    img: string;
    name: string;
    position: string;
    company: string;
    text: string;
    title?: string;
}


const testimonialsData: Testimonial[] = [
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
    const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
    const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

    const handleDetailsOpen = (testimonial: Testimonial) => {
        setSelectedTestimonial(testimonial);
        setDetailsOpen(true);
    };

    const handleDetailsClose = () => {
        setDetailsOpen(false);
    };

    const renderTestimonialText = (testimonial: Testimonial) => {
        if (testimonial.text.length <= 200) {
            return <p>&quot;{testimonial.text}&quot;</p>;
        }
        return (
            <p>
                &quot;{testimonial.text.slice(0, 200)}...&quot;
                <span
                    onClick={() => handleDetailsOpen(testimonial)}
                    className={styles.testimonials__slide_container_middle_readMore}
                >
                    Read More
                </span>
            </p>
        );
    };

    const content = (
        <>
            {testimonialsData.map((testimonial, index) => (
                <div key={index} className={`keen-slider__slide ${styles.testimonials__slide_container}`}>
                    {renderTestimonialText(testimonial)}
                    <div className={styles.testimonials__slide_container_lower}>
                        <div>
                            <Image src={testimonial.img} alt="testimonial" width={200} height={200} />
                        </div>
                        <div>
                            <h4>{testimonial.name}</h4>
                            <h4>{testimonial.position}</h4>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );

    return (
        <section className={styles.testimonials}>
            <h2>What Our Clients Say</h2>
            <Slider content={content} />
            <AnimatePresence mode='wait'>
                {detailsOpen && selectedTestimonial && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.testimonialsDetailsModal}
                        onClick={handleDetailsClose}
                    >
                        <div className={styles.testimonialsDetailsContent} onClick={(e) => e.stopPropagation()}>
                            <button onClick={handleDetailsClose} className={styles.close}>Close</button>
                            <Image src={selectedTestimonial.img} alt="testimonial" width={200} height={200} />
                            <p>{selectedTestimonial.text}</p>
                            <h4>{selectedTestimonial.name}</h4>
                            <h5>{selectedTestimonial.position}, {selectedTestimonial.company}</h5>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Testimonials;